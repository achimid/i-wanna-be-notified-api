# [IWannaBeNotified](http://iwannabenotified.ddns.net/)


## O que é o IWannaBeNotified?

<p align="justify">
    O IWannaBeNotified é um serviço de notificação de páginas da internet disponibilizado por meio de uma API REST, que permite que você monitore um site por atualizações e receba uma notificação sempre que houver uma mudança no site monitorado.
</p>

<p align="justify">
    O serviço é customizável a ponto de configurar: quais informações você deseja monitorar dentro do site, o template que você deseja receber a notificação e até mesmo os canais que você deseja ser notificado.
</p>

Possíveis canais para receber a notificação:
* Email
* Telegram
* Web Hooks
* Websocket
* <s>Web Push</s> *
* <s>PubSub</s> *
* <s>SMS</s> *
* <s>Facebook Messenger</s> *
* <s>Whatsapp</s> *

(* - não disponível no momento)
 
## Como posso utilizar o NotifyMe?

<p align="justify">
    O serviço permite que você monitore o conteúdo de uma página Web apenas informando o endereço da página, assim que o serviço identificar uma mudança de conteúdo você será notificado. Esse tipo de ação deve sempre ser realizada com muito cuidade, pois normalmente as páginas da web mudam com muita frequência, algumas delas, chegam a ser diferente a cada acesso, por exemplo, páginas com propagandas e datas de acesso.
</p>

<p align="justify">
    A verificação do site é feita de uma forma cíclica, ou seja, de tempos em tempos o serviço acesse o site desejado para monitorar o conteúdo, é possível configurar este tempo de verificação. Assim, você irá receber a notificação o mais rapido possivel, respeitando cada ciclo, dependendo do seu propósito é possivel configurar esse tempo de execução. Também é possível configurar o monitoramento para que você receba apenas conteúdos quando forem diferentes do conteúdo encontrado anteriormente ou até mesmo conteúdos únicos.
</p>

## Extração de informações - [[Web Scraping](https://pt.wikipedia.org/wiki/Coleta_de_dados_web)]

<p align="justify">
    Com o serviço do <a href="http://iwannabenotified.ddns.net/">IWannaBeNotified</a> também é possivel extrair informações da página web por meio de uma técnica chamada <a href="https://pt.wikipedia.org/wiki/Coleta_de_dados_web">Web Scraping</a>.
    Além das notificações é possível receber o conteúdo extraído da página, para isso é necessário um pouco de conhecimento de Javascript ou JQuery. Caso você conheça o basico dessa linguagem de script, é possível criar scripts para manipulação do conteúdo da página antes da extração das informações desejadas, desta maneira você pode extrair apenas um trexo ou uma parte da página.
</p>



# API

Endereço da API:
```
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1
```


## Contextualização
 
<p align="justify">
    A API permite que você cadastre intenções de monitoramento, na documentação é chamado de monitoramento (<code>/monitoring</code>). O monitoramento determina alguns parametros de execução, como por exemplo, a periodicidade, o alvo (endereço do site), quais os scripts que serão executados e como será efetuada a notificação após a extração das informações.
</p>

<p align="justify">
    Após cadastrar a intenção de monitoramento (monitoring), quando chegar a hora de executar, será criado uma execução (<code>/execution</code>), essa execution é a operação de fato, ou seja, a aplicação irá acessar o site informado, executar os scripts informados, obter o conteúdo da pagina, se necessário irá interpretar o conteudo extraido criando novas execuções. No futuro essa execution será utilizada para efetuar os disparos das notificações. É possivel que um monitoramento tenha diversas execuções.
</p>
 
<!-- Existe a possibilidade de criar um usuário na aplicação, para que o usuário possa gerenciar todos os monitoramentos cadastrados, mas também é possível criar um monitoramento anônimo. Para identificação do usuário é necessário informar no header `Authentication` o Token JWT fornecido no momento da autenticação.  -->

<!-- Com a utilização de um usuário é possível centralizar algumas operações como por exemplo, notificações e filtros. Ao cadastrar um filtro para o usuário, todas suas request irão respeitar esse filtro, exceto quando ela tiver um filtro próprio. Também é possível cadastrar notificações para o usuário, e quando a request não tiver uma notificação própria ele utilizará a cadastrada para o usuário. -->


<p align="justify">
    As operações são realizadas de uma forma assincrona, onde um monitoramento é cadastrado e de tempos em tempos ele irá criar uma execução e acessar a pagina e extrair as informações, assim que cada execução é finalizada, será enviado uma notificação conforme cadastrado no monitoramento. 
</p>

<p align="justify">
    Dito isso, é possivel utilizar um endpoint para tornar o processo sincrono e esperar as execuções terminarem, mas é valido ressaltar que o endpoint tem um <b>timeout request</b> de <b>30 segundos</b> e o endpoint em questão <code>(/monitoring/sync)</code> não é performático.
</p>

 
## Documentação

A seguir veja alguns dos recursos disponibilizados para utilização do serviço por meio de REST API:

## Resources
~~~
GET     /log
GET     /log/:id

GET     /execution
GET     /execution/:id

GET     /monitoring
GET     /monitoring/:id
POST    /monitoring
PUT     /monitoring/:id
DELETE  /monitoring/:id

POST    /monitoring/sync
POST    /monitoring/sync/full

GET     /notification
GET     /notification/:id
~~~


-------

## Schema: montoring

<details open>
    <summary><b>Request</b></summary>    
    

~~~json
{
    "url": "https://google.com",
    "name": "My Google Website Monitoring",
    "scriptTarget": "Some Javascript code, example: [document.querySelector('body').innerText]",
    "scriptContent": ["Some Javascript code, example: [document.querySelector('body').innerText]"],
    "filter": {
        "threshold": 0.7,
        "words": ["apple", "google"]
    },
    "regularity": "*/3 * * * *",
    "disabled": false,
    "options": {
        "timeout": 30000,
        "waitUntil": "networkidle0",
        "enableUserAgentRandom": false,
        "useJquery": false,
        "scriptTagUrl": "Some Javascript Tag to Inject in the page",
        "waitTime": 100,
        "printscreen": false,
        "printscreenFullPage": false,
        "notifyChange": false,
        "notifyUniqueChange": false,
        "levelMax": 0,
        "proxy": "Some Proxy Url",
        "temporary": true
    },
    "notifications": [{
        "level": 0,
		"template": "Hi My name is John - WebSocket Notification",
        "websocket": true
    },
    {
        "level": 0,
		"template": "Hi My name is John - Email Notification",
        "email": ["john@email.com"]		
    },
    {
        "level": 0,
		"template": "Hi My name is John - Telegram Notification",
        "telegram": [{                
            "bot_token": "Telegram Bot Token for integration",
            "chat_id": "Telegram Chat Id to send message"
        }]
    },
    {
        "level": 0,
		"template": "Hi My name is John - Webhook Notification",
        "webhook": [{
            "url": "https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/webhook/callback", 
            "method": "POST"
        }]
    }]
}
~~~

</details> 

<details>
    <summary><b>Response</b></summary>    
    

~~~json
{
    "filter": {
        "words": [
            "apple",
            "google"
        ]
    },
    "scriptContent": [
        "Some Javascript code, example: [document.querySelector('body').innerText]"
    ],
    "_id": "5fea210085b59f15d5cdebf0",
    "url": "https://google.com",
    "name": "My Google Website Monitoring",
    "scriptTarget": "Some Javascript code, example: [document.querySelector('body').innerText]",
    "regularity": "*/3 * * * *",
    "disabled": false,
    "options": {
        "timeout": 30000,
        "waitUntil": "networkidle0",
        "enableUserAgentRandom": false,
        "useJquery": false,
        "scriptTagUrl": "Some Javascript Tag to Inject in the page",
        "waitTime": 100,
        "printscreen": false,
        "printscreenFullPage": false,
        "notifyChange": false,
        "notifyUniqueChange": false,
        "levelMax": 0,
        "proxy": "Some Proxy Url",
        "temporary": true
    },
    "notifications": [
        {
            "level": 0,
            "template": "Hi My name is John - WebSocket Notification",
            "websocket": true
        },
        {
            "level": 0,
            "template": "Hi My name is John - Email Notification",
            "email": [
                "john@email.com"
            ]
        },
        {
            "level": 0,
            "template": "Hi My name is John - Telegram Notification",
            "telegram": [
                {
                    "bot_token": "Telegram Bot Token for integration",
                    "chat_id": "Telegram Chat Id to send message"
                }
            ]
        },
        {
            "level": 0,
            "template": "Hi My name is John - Webhook Notification",
            "webhook": [
                {
                    "url": "https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/webhook/callback",
                    "method": "POST"
                }
            ]
        }
    ],
    "createdAt": "2020-12-28T18:16:32.030Z",
    "updatedAt": "2020-12-28T18:16:32.030Z"
}
~~~

</details> 



<details>
    <summary><b>Atributos</b></summary>    
    
Atributo | Descrição
:--------- | :-------
atributo             | descrição

</details> 

------


## Schema: execution


<details open>
    <summary><b>Response</b></summary>    
    

~~~json
{
    "_id": "5fea21be62a7dd00174ca0cb",
    "filter": {
        "words": [
            "apple",
            "google"
        ]
    },
    "scriptContent": [
        "Some Javascript code, example: [document.querySelector('body').innerText]"
    ],
    "extractedContent": ["[No Content]"],
    "uuid": "d468a388-820a-4985-8561-47c24d70f15b",
    "url": "http://google.com",
    "scriptTarget": "[...document.querySelectorAll('a')].map(e => e.href)",
    "createdAt": "2020-12-28T18:19:40.275Z",
    "updatedAt": "2020-12-28T18:19:42.564Z",
    "monitoringId": "5fea21bc58eafd001e5d39ce",
    "startTime": "2020-12-28T18:19:40.355Z",
    "level": 0,
    "options": {
        "timeout": 30000,
        "waitUntil": "networkidle0",
        "printscreen": false,
        "printscreenFullPage": false
    },
    "extractedTarget": "<!DOCTYPE html><html xmlns=\"http://www.w3.org/1999/xhtml\" itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"en\"><head><meta charset=\"UTF-8\"... ",
    "endTime": "2020-12-28T18:19:41.911Z",
    "executionTime": "1556ms",
    "extractedTargetNormalized": "<!DOCTYPE html><html xmlns=\"http://www.w3.org/1999/xhtml\" itemscope=\"\" itemtype=\"http://schema.org/WebPage\" lang=\"en\"><head><meta charset=\"UTF-8\"...",
    "isSuccess": true,
    "hashTarget": "2d3a256612beba0c9052e39067ed9cdd",
    "hashTargetChanged": false,
    "hashTargetUnique": true,
    "isLast": true,
    "errorOnExecuteScriptTarget": { },
    "errorOnPrintPage": { },
    "errorOnUploadPrintscreen": { },
    "errorOnRemovePrintscreen": { },
    "errorOnExecuteScriptTarget": { },
    "errorOnExecuteScriptTarget": { },
    "errorOnAddUserAgent": { }
}
~~~

</details> 



<details>
    <summary><b>Atributos</b></summary>    
    
Atributo | Descrição
:--------- | :-------
atributo             | descrição

</details> 

------


## Schema: log


<details open>
    <summary><b>Response</b></summary>    
    

~~~json

{
    "_id": "5fea238b11d4840017e097a4",
    "createdAt": "2020-12-28T18:00:36.100Z",
    "uuid": "d468a388-820a-4985-8561-47c24d70f15b",
    "executionTime": "0ms",
    "log": "Starting extraction",
    "level": "0"
}
        
~~~

</details> 



<details>
    <summary><b>Atributos</b></summary>    
    
Atributo | Descrição
:--------- | :-------
atributo             | descrição

</details> 

------

## Schema: notification


<details open>
    <summary><b>Response</b></summary>    
    

~~~json

{
    "_id": "5fea238b11d4840017e097a4",
    "uuid": "d468a388-820a-4985-8561-47c24d70f15b",
    "executionId": "5fea21be62a7dd00174ca0cb",
    "monitoringId": "5fea238b58eafd001e5d39d0",
    "type": "",
    "isSuccess": true,
    "startTime": "2020-12-28T18:19:40.355Z",
    "endTime": "2020-12-28T18:19:41.911Z",
    "errorOnSendEmail": {},
    "errorOnSendWebhook": {},
    "errorOnSendWebsocket": {},
    "errorOnSendTelegram": {},
    "createdAt": "2020-12-28T18:19:40.275Z",
    "updatedAt": "2020-12-28T18:19:42.564Z",
        
}
        
~~~

</details> 



<details>
    <summary><b>Atributos</b></summary>    
    
Atributo | Descrição
:--------- | :-------
atributo             | descrição

</details> 

------

## <b>Cadastrar monitoramento </b> 
Este endpoint deve ser utilizado para cadastrar um novo monitoramento de pagina e suas configurações especificas.

```
POST    /monitoring     Content-Type: application/json
```

<details open>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json
Request:
{
    "url": "http://google.com",
    "name": "My Google Website Monitoring",
    "scriptTarget": "[document.querySelector('body').innerText]",
    "notifications": [{
        "level": 0,
        "template": "Hi My name is John - Email Notification",
        "email": ["john@email.com"]		
    }]
}


Response:
{
    "scriptContent": [],
    "_id": "5fea28e358eafd001e5d39d2",
    "url": "http://google.com",
    "name": "My Google Website Monitoring",
    "scriptTarget": "[document.querySelector('body').innerText]",
    "notifications": [{
        "level": 0,
        "template": "Hi My name is John - Email Notification",
        "email": ["john@email.com"]
    }],
    "createdAt": "2020-12-28T18:50:11.372Z",
    "updatedAt": "2020-12-28T18:50:11.372Z"
}
~~~
</details> 

<details>
    <summary><b>Exemplo de requisição 2</b></summary>    

~~~json
Request:
{
    "url": "http://google.com"
}


Response:
{
    "scriptContent": [],
    "_id": "5fea290f58eafd001e5d39d3",
    "url": "http://google.com",
    "notifications": [],
    "createdAt": "2020-12-28T18:50:55.597Z",
    "updatedAt": "2020-12-28T18:50:55.597Z"
}
~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "url": "http://google.com",
    "name": "My Google Website Monitoring",
    "scriptTarget": "[document.querySelector('body').innerText]",
    "notifications": [{
        "level": 0,
        "template": "Hi My name is John - Email Notification",
        "email": ["john@email.com"]		
    }]
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
~~~
</details> 

--------------

## <b>Editar monitoramento </b> 
Este endpoint deve ser utilizado para editar as informações de um monitoramento.

```
PUT     /monitoring/:id     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json
~~~
</details> 

<details>
    <summary><b>Exemplo de requisição 2</b></summary>    

~~~json
~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
~~~
</details> 

--------------

## <b>Listar monitoramento </b> 
Este endpoint deve ser utilizado para listar os monitoramento, sendo possivel filtrar por parametros na query.

```
GET     /monitoring     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json
~~~
</details> 

<details>
    <summary><b>Exemplo de requisição 2</b></summary>    

~~~json
~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
~~~
</details> 

--------------

## <b>Buscar monitoramento</b> 
Este endpoint deve ser utilizado para buscar um monitoramento utilizando o id.

```
GET     /monitoring/:id     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json
~~~
</details> 

<details>
    <summary><b>Exemplo de requisição 2</b></summary>    

~~~json
~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
~~~
</details> 

--------------

## <b>Remover monitoramento por Id </b> 
Este endpoint deve ser utilizado para excluir um monitoramento utilizando do o id.

```
DELETE     /monitoring/:id     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json
~~~
</details> 

<details>
    <summary><b>Exemplo de requisição 2</b></summary>    

~~~json
~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
~~~
</details> 

--------------


## Documentação Swagger

[Documentação da API - Swagger](http://iwannabenotified.ddns.net/api/v1/docs)

### Funcionamento

// TODO - Explicar a utilização do puppeteer, dos workers, do fallback da api, das options, sobre o filtro de similaridade, sobre a linguagem do projeto.... Sobre as integrações, sobre o usuário


### Arquitetura


### (Ideias/Exemplos)
 
Algumas Idéias e Exemplos de utilização:
 
#### Exemplo de Utilização 1

* Desejo monitorar uma pagina de noticias, para receber uma notificação sempre que uma nova notícia for lançada.

#### Exemplo de Utilização 2

* Desejo receber por e-mail sempre que houver uma mudança no meu site empresarial.

#### Exemplo de Utilização 3

* Sempre que houver uma lançamento de um site (Filme, Séries ...) quero que meu sistema receba uma notificação do conteúdo para que eu possa centralizar o conteúdo de diversos sites.

#### Exemplo de Utilização 4

* Gostaria de receber uma notificação no telegram sempre que surgir uma notícia ou um artigo sobre um determinado assunto.

#### Exemplo de Utilização 5

* Gostaria de fazer um histórico da pagina por meio de imagens/printscreens, a cada alteração.

#### Idéias

* Criar um sistema de monitoramento que verifica se o seu site ou API está em funcionamento (Health Check)
* Criar uma aplicação que sempre que você fizer uma postagem em seu site, automaticamente essa postagem é distribuída para um grupo no Telegram ou Whatsapp automatizando o processo.
* Criar uma aplicação para criar históricos de sites como se fosse um backup, basta apenas apontar para a url do site e os backup começaram a ser gerados em forma de HTML... ou Imagens...
* Criar uma API centralizadora de lançamento de Filmes
* O mesmo descrito acima para Séries
* O mesmo descrito acima para Animes
* Sempre que algo novo for publicado no site ou blog, efetua o disparo de notificações para as pessoas assinantes podendo ser por e-mail, sms, rede social, ou até mesmo notificação push
* Criar uma API centralizadora de conteúdos de Notícias
* Criar uma API centralizadora de conteúdos de Pessoas famosas
* Criar uma aplicação onde é possível cadastrar o valor desejado de um papel do mercado de ações e quando o papel atingir determinado valor, receber um aviso, executar uma compra/venda ou até mesmo um comando desejado
* Criar um sistema que sempre que lançar os animes que você assiste em um site de sua escolha, efetuar o download do anime automaticamente
* Criar um sistema para monitorar quando o resultado de um concurso for publicado