# [IWannaBeNotified](http://iwannabenotified.ddns.net/) 

## O que é o IWannaBeNotified?

<p align="justify">
    O IWannaBeNotified é um serviço de notificação de páginas da internet disponibilizado por meio de uma API REST, que permite que você monitore um site por atualizações e receba uma notificação sempre que houver uma mudança no site monitorado.
</p>

<p align="justify">
    O serviço é customizável a ponto de configurar quais informações você deseja monitorar dentro do site, o template que você deseja receber a notificação e até mesmo os canais que você deseja ser notificado.
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
    O serviço permite que você monitore o conteúdo de uma página web apenas informando o endereço da página, assim que o serviço identificar uma mudança de conteúdo, você será notificado. Esse tipo de ação deve sempre ser realizada com muito cuidado, normalmente as páginas da web mudam com muita frequência, algumas delas, chegam a ser diferente a cada acesso, por exemplo, páginas com propagandas e datas de acesso.
</p>

<p align="justify">
    A verificação do site é feita de uma forma cíclica, ou seja, de tempos em tempos o serviço acessa o site desejado para monitorar o conteúdo, é possível configurar este tempo de verificação. Assim, você irá receber a notificação o mais rapido possível, respeitando cada ciclo, dependendo do seu propósito é possível configurar esse tempo de execução. Também é possível configurar o monitoramento para que você receba apenas conteúdos quando forem diferentes do conteúdo encontrado anteriormente ou até mesmo conteúdos únicos.
</p>

## Extração de informações - [[Web Scraping](https://pt.wikipedia.org/wiki/Coleta_de_dados_web)]

<p align="justify">
    Com o serviço do <a href="http://iwannabenotified.ddns.net/">IWannaBeNotified</a> também é possível extrair informações da página web por meio de uma técnica chamada <a href="https://pt.wikipedia.org/wiki/Coleta_de_dados_web">Web Scraping</a>.
    Além das notificações é possível receber o conteúdo extraído da página, para isso é necessário um pouco de conhecimento de <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript">Javascript</a> ou <a href="https://jquery.com/">JQuery</a>. Caso você conheça o basico dessa linguagem de script, é possível criar scripts para manipulação do conteúdo da página antes da extração das informações desejadas, desta maneira você pode extrair apenas um trexo ou uma parte da página.
</p>

## Extração de informações - [[Web Crawler](https://pt.wikipedia.org/wiki/Rastreador_web)]

<p align="justify">
    Com o serviço do <a href="http://iwannabenotified.ddns.net/">IWannaBeNotified</a> também é possível extrair informações da página web por meio de uma técnica chamada <a href="https://pt.wikipedia.org/wiki/Coleta_de_dados_web">Web Scraping</a>.
    Além das notificações é possível receber o conteúdo extraído da página, para isso é necessário um pouco de conhecimento de <a href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript">Javascript</a> ou <a href="https://jquery.com/">JQuery</a>. Caso você conheça o basico dessa linguagem de script, é possível criar scripts para manipulação do conteúdo da página antes da extração das informações desejadas, desta maneira você pode extrair apenas um trexo ou uma parte da página.
</p>


# Como contribuir com o projeto?
* Você pode enviar sugestões e ideias.
* Você pode abrir um PR com alterações.
* Você pode falar do projeto para um amigo.
* Você pode divulgar o projeto em suas redes sociais.
* Você pode realizar uma doação utilizando o botão abaixo:

<p align="center">
  <a href="https://www.paypal.com/donate?hosted_button_id=36KAJHCWGX5HJ">
      <img src="https://www.paypalobjects.com/pt_BR/i/btn/btn_donateCC_LG.gif" alt="Botão de Doação">
  </a>
</p>

# API

Endereço da [API](http://i-wanna-be-notified-api-01.herokuapp.com/api/v1):
```
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1
```


Endereço da [Documentação Postman](https://documenter.getpostman.com/view/11024266/TVt17ijV):
```
https://documenter.getpostman.com/view/11024266/TVt17ijV
```



```diff
- Até o momento a utilização do serviço é grátis e sem limites. Então seja justo e não abuse.
```

## Contextualização
 
<p align="justify">
    A API permite que você cadastre intenções de monitoramento, na documentação é chamado de <a href="#schema-monitoring">monitoramento</a> (<code>/monitoring</code>). O monitoramento determina alguns parâmetros de execução, como por exemplo, a periodicidade, o alvo (endereço do site), quais os scripts que serão executados e como será efetuada a notificação após a extração das informações.
</p>

<p align="justify">
    Após cadastrar a intenção de monitoramento (monitoring), quando chegar a hora de executar, será criado uma <a href="#schema-execution">execução</a> (<code>/execution</code>), essa execution é a operação de fato, ou seja, a aplicação irá acessar o site, executar os scripts informados, obter o conteúdo da pagina, se necessário irá interpretar o conteudo extraido criando novas execuções. No futuro essa execution será utilizada para efetuar os disparos das notificações. É possível que um monitoramento tenha diversas execuções.
</p>
 
<!-- Existe a possibilidade de criar um usuário na aplicação, para que o usuário possa gerenciar todos os monitoramentos cadastrados, mas também é possível criar um monitoramento anônimo. Para identificação do usuário é necessário informar no header `Authentication` o Token JWT fornecido no momento da autenticação.  -->

<!-- Com a utilização de um usuário é possível centralizar algumas operações como por exemplo, notificações e filtros. Ao cadastrar um filtro para o usuário, todas suas request irão respeitar esse filtro, exceto quando ela tiver um filtro próprio. Também é possível cadastrar notificações para o usuário, e quando a request não tiver uma notificação própria ele utilizará a cadastrada para o usuário. -->


<p align="justify">
    As operações são realizadas de uma forma assíncrona, onde um monitoramento é cadastrado e de tempos em tempos ele irá criar uma execução e acessar a pagina e extrair as informações, assim que cada execução é finalizada, será enviado uma notificação conforme cadastrado no monitoramento. 
</p>

<p align="justify">
    Dito isso, é possível utilizar um endpoint para tornar o processo síncrono e esperar as execuções terminarem, mas é valido ressaltar que o endpoint tem um <b>timeout request</b> de <b>30 segundos</b> e o endpoint em questão <code>(/monitoring/sync)</code> não é performático.
</p>

 
## Documentação

A seguir veja alguns dos recursos disponibilizados para utilização do serviço por meio de REST API:

## Resources
~~~
GET     /log
GET     /log/:id

GET     /execution
GET     /execution/:id

GET     /notification
GET     /notification/:id

GET     /monitoring
GET     /monitoring/:id
POST    /monitoring
PUT     /monitoring/:id
DELETE  /monitoring/:id

POST    /scraper
POST    /scraper/pdf
POST    /scraper/link
POST    /scraper/image
POST    /scraper/screenshot
POST    /scraper/screenshot/full

POST    /sync/scraper
POST    /sync/scraper/pdf
POST    /sync/scraper/link
POST    /sync/scraper/image
POST    /sync/scraper/screenshot
POST    /sync/scraper/screenshot/full

POST    /crawler
POST    /sync/crawler

~~~


-------

## Schema: monitoring

<details>
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


<details>
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


<details>
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


<details>
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
Este endpoint deve ser utilizado para cadastrar um novo monitoramento de pagina e suas configurações específicas.

```
POST    /monitoring     Content-Type: application/json
```

<details>
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

Status Code: 201(CREATED)
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

Status Code: 201(CREATED)
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

Request:
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

Response:
Status Code: 200(OK)

~~~
</details> 

<details>
    <summary><b>Exemplo de requisição 2</b></summary>    

~~~json

Request:
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
    "disabled": false
}

Response:
Status Code: 200(OK)

~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "url": "https://google.com",
    "name": "My Google Website Monitoring",
    "scriptTarget": "Some Javascript code, example: [document.querySelector('body').innerText]",
    "scriptContent": ["Some Javascript code, example: [document.querySelector('body').innerText]"],
    "filter": {
        "threshold": 0.7,
        "words": ["apple", "google"]
    },
    "regularity": "*/3 * * * *",
    "disabled": false
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring/5feb69147755ab001e5b3dc6", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

~~~
</details> 

--------------

## <b>Listar monitoramentos </b> 
Este endpoint deve ser utilizado para listar os monitoramento, sendo possível filtrar por parâmetros na query.

```
GET     /monitoring     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json

Request:
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring?name=My Google Website Monitoring&url=http://google.com&regularity=*/15 * * * *

Response:
[
    {
        "_id": "5feb7f0748e850001ed301a6",
        "filter": {
            "words": [
                "apple",
                "google"
            ]
        },
        "scriptContent": [
            "Some Javascript code, example: [document.querySelector('body').innerText]"
        ],
        "url": "https://google.com",
        "name": "My Google Website Monitoring",
        "scriptTarget": "Some Javascript code, example: [document.querySelector('body').innerText]",
        "regularity": "*/3 * * * *",
        "disabled": false,
        "options": {
            "temporary": true
        },
        "notifications": [],
        "createdAt": "2020-12-29T19:09:59.555Z",
        "updatedAt": "2020-12-29T19:09:59.555Z"
    }
]

Status Code: 200(OK)

~~~
</details> 


<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring?name=My Google Website Monitoring&url=http://google.com&regularity=*/15 * * * *", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

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

Request:
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring/5feb6a0f7755ab001e5b3dc7

Response:
{
    "_id": "5feb7f0748e850001ed301a6",
    "filter": {
        "words": [
            "apple",
            "google"
        ]
    },
    "scriptContent": [
        "Some Javascript code, example: [document.querySelector('body').innerText]"
    ],
    "url": "https://google.com",
    "name": "My Google Website Monitoring",
    "scriptTarget": "Some Javascript code, example: [document.querySelector('body').innerText]",
    "regularity": "*/3 * * * *",
    "disabled": false,
    "options": {
        "temporary": true
    },
    "notifications": [],
    "createdAt": "2020-12-29T19:09:59.555Z",
    "updatedAt": "2020-12-29T19:09:59.555Z"
}

Status Code: 200(OK)

~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring/5feb6a0f7755ab001e5b3dc7", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

~~~

</details> 

--------------

## <b>Remover monitoramento</b> 
Este endpoint deve ser utilizado para excluir um monitoramento utilizando do o id.

```
DELETE     /monitoring/:id     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json

Request:
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring/5fa04e55adb14c001e2b09ed

Response:
Status Code: 200(OK)

~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript

var requestOptions = {
  method: 'DELETE',
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring/5fa04e55adb14c001e2b09ed", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

~~~
</details> 

--------------








## <b>Listar execuções </b> 
Este endpoint deve ser utilizado para listar as execuções, sendo possível filtrar por parâmetros na query.

```
GET     /execution     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json

Request:
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/execution?uuid=57512d45-19ed-48a8-8715-9efb591bfff9&isSuccess=true&level=0&hashTarget=00e9d899e337787102a43cf3ba8dd739&monitoringId=5fe9b2d4494d97001e5d4f33&hashTargetChanged=false&hashTargetUnique=false&url=https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/&isLast=true

Response:
[
    {
        "_id": "5fe9bad53a073e0017197976",
        "filter": {
            "words": []
        },
        "scriptContent": [],
        "extractedContent": [],
        "url": "https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/",
        "options": {
            "timeout": 30000,
            "waitUntil": "networkidle0",
            "printscreen": false,
            "printscreenFullPage": false
        },
        "createdAt": "2020-12-28T10:26:28.262Z",
        "updatedAt": "2020-12-28T11:00:37.414Z",
        "monitoringId": "5fe9b2d4494d97001e5d4f33",
        "uuid": "57512d45-19ed-48a8-8715-9efb591bfff9",
        "startTime": "2020-12-28T11:00:35.116Z",
        "scriptTarget": "new XMLSerializer().serializeToString(document)",
        "level": 0,
        "extractedTarget": "<html>...</html>",
        "endTime": "2020-12-28T11:00:36.279Z",
        "executionTime": "1163ms",
        "extractedTargetNormalized": "<html>...</html>",
        "isSuccess": true,
        "hashTarget": "00e9d899e337787102a43cf3ba8dd739",
        "hashTargetChanged": false,
        "hashTargetUnique": false,
        "isLast": true
    }
]

Status Code: 200(OK)

~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/execution?uuid=57512d45-19ed-48a8-8715-9efb591bfff9&isSuccess=true&level=0&hashTarget=00e9d899e337787102a43cf3ba8dd739&monitoringId=5fe9b2d4494d97001e5d4f33&hashTargetChanged=false&hashTargetUnique=false&url=https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/&isLast=true", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
~~~
</details> 

--------------

## <b>Buscar execução</b> 
Este endpoint deve ser utilizado para buscar uma execução utilizando o id.

```
GET     /execution/:id     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json

Request:
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/execution/5fe9bad53a073e0017197976

Response:
{
    "_id": "5fe9bad53a073e0017197976",
    "filter": {
        "words": []
    },
    "scriptContent": [],
    "extractedContent": [],
    "url": "https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/",
    "options": {
        "timeout": 30000,
        "waitUntil": "networkidle0",
        "printscreen": false,
        "printscreenFullPage": false
    },
    "createdAt": "2020-12-28T10:26:28.262Z",
    "updatedAt": "2020-12-28T11:00:37.414Z",
    "monitoringId": "5fe9b2d4494d97001e5d4f33",
    "uuid": "57512d45-19ed-48a8-8715-9efb591bfff9",
    "startTime": "2020-12-28T11:00:35.116Z",
    "scriptTarget": "new XMLSerializer().serializeToString(document)",
    "level": 0,
    "extractedTarget": "<html>...</html>",
    "endTime": "2020-12-28T11:00:36.279Z",
    "executionTime": "1163ms",
    "extractedTargetNormalized": "<html>...</html>",
    "isSuccess": true,
    "hashTarget": "00e9d899e337787102a43cf3ba8dd739",
    "hashTargetChanged": false,
    "hashTargetUnique": false,
    "isLast": true
}

Status Code: 200(OK)

~~~
</details> 


<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/execution/5fe9bad53a073e0017197976", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
~~~
</details> 

--------------


## <b>Listar logs </b> 
Este endpoint deve ser utilizado para listar os logs gerados durante a execução do monitoramento, sendo possível filtrar por parâmetros na query.

```
GET     /log     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json

Request:
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/log?startDate=2020-12-01&endDate=2020-12-29&uuid=08a50adc-7413-4ce8-a0c0-93ef7c9bd15c&type=json

Response:
[
    {
        "_id": "5feb828d6eacde0017f14e8f",
        "createdAt": "2020-12-29T19:00:38.276Z",
        "uuid": "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c",
        "executionTime": "61412ms",
        "log": "Updating execution",
        "level": "0"
    },
    {
        "_id": "5feb828d6eacde0017f14e8e",
        "createdAt": "2020-12-29T19:00:38.276Z",
        "uuid": "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c",
        "executionTime": "61393ms",
        "log": "Execution saved",
        "level": "0"
    }
]

Status Code: 200(OK)

~~~
</details> 

<details>
    <summary><b>Exemplo de requisição 2</b></summary>    

~~~json

Request:
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/log?startDate=2020-12-01&endDate=2020-12-29&uuid=08a50adc-7413-4ce8-a0c0-93ef7c9bd15c&type=text

Response:
[
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 61412ms, Updating execution, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 61393ms, Execution saved, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 61337ms, Save execution, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 61336ms, Changed hash calculated, hashTargetChanged=true, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 61067ms, Changed unique calculated, hashTargetUnique=false, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60742ms, Calculation changed hash, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60751ms, Calculation unique hash, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60262ms, UnespectedError: , {}",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60741ms, Similarity found, filter match [apple,google], ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60257ms, ScriptContent processed, [\"[No content]\"]",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60260ms, Printscreen page ignored, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60261ms, Closing page, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60256ms, Trying to flat extractedContent, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60254ms, ScriptContent executed, [\"[No content]\"]",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60251ms, Erro on execute ScriptContent, {\"script\":\"Some Javascript code, example: [document.querySelector('body').innerText]\",\"message\":\"Protocol error (Runtime.evaluate): Session closed. Most likely the page has been closed.\"}",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60249ms, Executing scriptContent, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60247ms, Fetching page manually - Ending - Page navigation retry, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60090ms, Fetching page manually - Starging - Page navigation retry, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 60088ms, Error on execute ScriptTarget, {\"message\":\"Protocol error (Runtime.evaluate): Target closed.\"}",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 30315ms, Executing scriptTarget, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 30310ms, Error on accessUrl, {\"name\":\"TimeoutError\"}",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 307ms, UserAgentRandom ignored, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 309ms, Starting access to url, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 305ms, New page created, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 0ms, Starting extraction, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 31ms, Creating new page, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 4001ms, ** Notification not sent **, \"Notifications not found\"",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 4000ms, Validating notification, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 3999ms, Database informations fetched, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 1ms, Fetching database informations, ",
    "08a50adc-7413-4ce8-a0c0-93ef7c9bd15c, [0], 0ms, Starting notification, "
]

Status Code: 200(OK)

~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/log?startDate=2020-12-01&endDate=2020-12-29&uuid=08a50adc-7413-4ce8-a0c0-93ef7c9bd15c&type=text", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
~~~
</details> 

--------------

## <b>Buscar log</b> 
Este endpoint deve ser utilizado para buscar um log utilizando o id.

```
GET     /log/:id     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json

Request:
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/log/5fea70dc7b1e2f0017de68c4

Response:
{
    "_id": "5fea70dc7b1e2f0017de68c4",
    "createdAt": "2020-12-28T23:00:38.620Z",
    "uuid": "af3acc50-da88-4047-bc3a-1e5ec914fde7",
    "executionTime": "12497ms",
    "log": "Updating execution",
    "level": "1"
}

Status Code: 200(OK)

~~~
</details> 


<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/log/5fea70dc7b1e2f0017de68c4", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
~~~
</details> 

--------------


## <b>Listar notificações </b> 
Este endpoint deve ser utilizado para listar as notificações disparadas, sendo possível filtrar por parâmetros na query.

```
GET     /notification     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json

Request:
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/notification?startDate=2020-12-01&endDate=2020-12-29&uuid=1cb28187-b092-404f-9d6f-a1f06a834a98&executionId=5fea64377b1e2f0017de6423&monitoringId=5f9dfdbf9165e7001ef5d672&type=webhook&isSuccess=true

Response:
[
    {
        "_id": "5fea643a8bfd740017a09bd8",
        "uuid": "1cb28187-b092-404f-9d6f-a1f06a834a98",
        "monitoringId": "5f9dfdbf9165e7001ef5d672",
        "executionId": "5fea64377b1e2f0017de6423",
        "startTime": "2020-12-28T23:03:19.331Z",
        "type": "webhook",
        "isSuccess": true,
        "endTime": "2020-12-28T23:03:22.220Z",
        "createdAt": "2020-12-28T23:03:22.221Z",
        "updatedAt": "2020-12-28T23:03:22.221Z"
    }
]

Status Code: 200(OK)

~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/notification?startDate=2020-12-01&endDate=2020-12-29&uuid=1cb28187-b092-404f-9d6f-a1f06a834a98&executionId=5fea64377b1e2f0017de6423&monitoringId=5f9dfdbf9165e7001ef5d672&type=webhook&isSuccess=true", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
~~~
</details> 

--------------

## <b>Buscar notificação</b> 
Este endpoint deve ser utilizado para buscar uma notificação utilizando o id.

```
GET     /notification/:id     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json

Request:
http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/notification/5feb61b2879d800017c4c6bb

Response:
{
    "_id": "5feb61b2879d800017c4c6bb",
    "uuid": "9d2d8bf0-98ff-44b7-bda0-9697d3fe5fd2",
    "monitoringId": "5f9dfe3e9165e7001ef5d675",
    "executionId": "5feb61aed6181500175a948b",
    "startTime": "2020-12-29T17:04:46.642Z",
    "type": "webhook",
    "isSuccess": true,
    "endTime": "2020-12-29T17:04:50.974Z",
    "createdAt": "2020-12-29T17:04:50.974Z",
    "updatedAt": "2020-12-29T17:04:50.974Z"
}

Status Code: 200(OK)

~~~
</details> 


<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/notification/5feb61b2879d800017c4c6bb", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
~~~
</details> 

--------------


## <b>Monitoramento Síncrono Temporário - Scraper - Básico</b> 
Este endpoint deve ser utilizado como teste para o cadastro de notificação. Todos os monitoramento criados por meio desse endpoint são temporários, isso significa que as informações (logs, notificações, monitoramento, execuções) são apagadas depois de finalizar as execuções.

Este endpoint retorna apenas algumas informações da execução, para mais informações veja os exemplos.

* **Este endpoint possui uma limitação de performance.**
* **Este endpoint possui uma limitação de timeout (30s) para a requisição, devido a platafrma PaaS (Heroku)**.
* **Esse endpoint trabalha com enfileiramento de recursos**.
* **Este endpoint utiliza um cache de 2 minutos**


```
GET     /notification/sync     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json

Request:
{
    "url": "https://google.com",
    "name": "My Google Website Monitoring",
    "scriptTarget": "document.querySelector('a').href"
}

Response:
{
    "extractedTarget": "https://mail.google.com/mail/?tab=wm&ogbl",
    "url": "https://google.com",
    "isSuccess": true,
    "uuid": "682cca9f-ae67-48ee-99c5-e9f94082a4cd",
    "executionTime": "1700ms",
    "extractedContent": []
}

Status Code: 200(OK)

~~~
</details> 

<details>
    <summary><b>Exemplo de requisição 2</b></summary>    

~~~json

Request:
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
    }
}

Response:
{
    "extractedTarget":"<html>...</html>",
    "url": "https://google.com",
    "isSuccess": true,
    "uuid": "682cca9f-ae67-48ee-99c5-e9f94082a4cd",
    "executionTime": "318ms",
    "extractedContent": [
        "[No content]"
    ]
}

Status Code: 200(OK)

~~~
</details> 

<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"url":"https://google.com","name":"My Google Website Monitoring","scriptTarget":"document.querySelector('a').href"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring/sync", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
~~~
</details> 

--------------

## <b>Monitoramento Síncrono Temporário - Scraper - Completo</b> 
Este endpoint deve ser utilizado como teste para o cadastro de notificação. Todos os monitoramento criados por meio desse endpoint são temporários, isso significa que as informações (logs, notificações, monitoramento, execuções) são apagadas depois de finalizar as execuções.

Este endpoint retorna todas as informações armazenadas durante a execução (monitoring, execution, executions, logs). Para mais informações veja os exemplos.

* **Este endpoint possui uma limitação de performance.**
* **Este endpoint possui uma limitação de timeout (30s) para a requisição, devido a platafrma PaaS (Heroku)**.
* **Esse endpoint trabalha com enfileiramento de recursos**.
* **Este endpoint utiliza um cache de 2 minutos**

```
GET     /notification/sync/full     Content-Type: application/json
```

<details>
    <summary><b>Exemplo de requisição 1</b></summary>    

~~~json

Request:
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
    "notifications": [
        {
            "level": 0,
            "template": "Hi My name is John - Webhook Notification",
            "webhook": [{
                "url": "https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/webhook/callback", 
                "method": "POST"
            }]
        }
    ]
}

Response:
{
    "execution": {
        "_id": "5feb89895223ef0017f691fc",
        "filter": {
            "words": [
                "apple",
                "google"
            ]
        },
        "scriptContent": [
            "Some Javascript code, example: [document.querySelector('body').innerText]"
        ],
        "extractedContent": [
            "[No content]"
        ],
        "uuid": "682cca9f-ae67-48ee-99c5-e9f94082a4cd",
        "url": "https://google.com",
        "scriptTarget": "Some Javascript code, example: [document.querySelector('body').innerText]",
        "options": {
            "timeout": 30000,
            "waitUntil": "networkidle0",
            "enableUserAgentRandom": false,
            "useJquery": false,
            "scriptTagUrl": "Some Javascript Tag to Inject in the page",
            "waitTime": 100,
            "printscreen": false,
            "printscreenFullPage": false,
            "levelMax": 0,
            "proxy": "Some Proxy Url"
        },
        "createdAt": "2020-12-29T19:54:48.478Z",
        "updatedAt": "2020-12-29T19:54:49.746Z",
        "monitoringId": "5feb898855eb60001e4f8941",
        "startTime": "2020-12-29T19:54:48.555Z",
        "level": 0,
        "errorOnAccessUrl": {},
        "extractedTarget":"<html>...</html>",
        "endTime": "2020-12-29T19:54:48.847Z",
        "executionTime": "292ms",
        "extractedTargetNormalized":"<html>...</html>",
        "isSuccess": true,
        "hashTarget": "e92230b29d99836cffa910236614f19e",
        "filterMatch": true,
        "hashTargetChanged": false,
        "hashTargetUnique": true,
        "isLast": true
    },
    "monitoring": {
        "_id": "5feb898855eb60001e4f8941",
        "filter": {
            "words": [
                "apple",
                "google"
            ]
        },
        "scriptContent": [
            "Some Javascript code, example: [document.querySelector('body').innerText]"
        ],
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
                "template": "Hi My name is John - Webhook Notification",
                "webhook": [
                    {
                        "url": "https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/webhook/callback",
                        "method": "POST"
                    }
                ]
            },
            {
                "webhook": [
                    {
                        "method": "PATCH",
                        "url": "https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring/sync/full"
                    }
                ]
            }
        ],
        "createdAt": "2020-12-29T19:54:48.478Z",
        "updatedAt": "2020-12-29T19:54:48.478Z"
    },
    "logs": [
        {
            "_id": "5feb89885223ef0017f691db",
            "createdAt": "2020-12-29T19:00:27.153Z",
            "uuid": "682cca9f-ae67-48ee-99c5-e9f94082a4cd",
            "executionTime": "0ms",
            "log": "Starting extraction",
            "level": "0"
        },
        {
            "_id": "5feb89885223ef0017f691dc",
            "createdAt": "2020-12-29T19:00:27.153Z",
            "uuid": "682cca9f-ae67-48ee-99c5-e9f94082a4cd",
            "executionTime": "2ms",
            "log": "Creating new page",
            "level": "0"
        },
        {
            "_id": "5feb898a879d800017c504a3",
            "createdAt": "2020-12-29T13:44:51.325Z",
            "uuid": "682cca9f-ae67-48ee-99c5-e9f94082a4cd",
            "log": "Starting notification"
        },
        {
            "_id": "5feb898a879d800017c504a4",
            "createdAt": "2020-12-29T13:44:51.325Z",
            "uuid": "682cca9f-ae67-48ee-99c5-e9f94082a4cd",
            "executionTime": "1ms",
            "log": "Fetching database informations"
        }
    ],
    "executions": [
        {
            "_id": "5feb89895223ef0017f691fc",
            "filter": {
                "words": [
                    "apple",
                    "google"
                ]
            },
            "scriptContent": [
                "Some Javascript code, example: [document.querySelector('body').innerText]"
            ],
            "extractedContent": [
                "[No content]"
            ],
            "uuid": "682cca9f-ae67-48ee-99c5-e9f94082a4cd",
            "url": "https://google.com",
            "scriptTarget": "Some Javascript code, example: [document.querySelector('body').innerText]",
            "options": {
                "timeout": 30000,
                "waitUntil": "networkidle0",
                "enableUserAgentRandom": false,
                "useJquery": false,
                "scriptTagUrl": "Some Javascript Tag to Inject in the page",
                "waitTime": 100,
                "printscreen": false,
                "printscreenFullPage": false,
                "levelMax": 0,
                "proxy": "Some Proxy Url"
            },
            "createdAt": "2020-12-29T19:54:48.478Z",
            "updatedAt": "2020-12-29T19:54:49.746Z",
            "monitoringId": "5feb898855eb60001e4f8941",
            "startTime": "2020-12-29T19:54:48.555Z",
            "level": 0,
            "errorOnAccessUrl": {},
            "extractedTarget":"<html>...</html>",
            "endTime": "2020-12-29T19:54:48.847Z",
            "executionTime": "292ms",
            "extractedTargetNormalized":"<html>...</html>",
            "isSuccess": true,
            "hashTarget": "e92230b29d99836cffa910236614f19e",
            "filterMatch": true,
            "hashTargetChanged": false,
            "hashTargetUnique": true,
            "isLast": true
        }
    ]
}

Status Code: 200(OK)

~~~
</details> 


<details>
    <summary><b>Exemplo de código - Javascript</b></summary>    

~~~javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"url":"https://google.com","name":"My Google Website Monitoring","scriptTarget":"Some Javascript code, example: [document.querySelector('body').innerText]","scriptContent":["Some Javascript code, example: [document.querySelector('body').innerText]"],"filter":{"threshold":0.7,"words":["apple","google"]},"regularity":"*/3 * * * *","disabled":false,"options":{"timeout":30000,"waitUntil":"networkidle0","enableUserAgentRandom":false,"useJquery":false,"scriptTagUrl":"Some Javascript Tag to Inject in the page","waitTime":100,"printscreen":false,"printscreenFullPage":false,"notifyChange":false,"notifyUniqueChange":false,"levelMax":0,"proxy":"Some Proxy Url","temporary":true},"notifications":[{"level":0,"template":"Hi My name is John - Webhook Notification","webhook":[{"url":"https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/webhook/callback","method":"POST"}]}]});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring/sync/full", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
~~~
</details> 

--------------



## Exemplos de integrações

(Em desenvolvimento)
<!-- // TODO: Colocar alguns exemplos de integrações com o webSockets, webhooks e telegramChat. -->

## Funcionamento

(Em desenvolvimento)

<!-- // TODO: Explicar a utilização do puppeteer, dos workers, do fallback da api, das options, sobre o filtro de similaridade, sobre a linguagem do projeto.... Sobre as integrações, sobre o usuário -->


## Arquitetura

![Imagem da arquitetura do projeto](https://github.com/achimid/i-wanna-be-notified-api/blob/main/.github/i-wanna-be-notified-infra.drawio.png?raw=true)

Este projeto é dividido em diversos micro-serviço, acesse outros repositório do projeto:

* [i-wanna-be-notified-api](https://github.com/achimid/i-wanna-be-notified-api)
* [i-wanna-be-notified-log](https://github.com/achimid/i-wanna-be-notified-log)
* [i-wanna-be-notified-front](https://github.com/achimid/i-wanna-be-notified-front)
* [i-wanna-be-notified-worker](https://github.com/achimid/i-wanna-be-notified-worker)
* [i-wanna-be-notified-scheduler](https://github.com/achimid/i-wanna-be-notified-scheduler)
* [i-wanna-be-notified-notify](https://github.com/achimid/i-wanna-be-notified-notify)
* [i-wanna-be-notified-catalog](https://github.com/achimid/i-wanna-be-notified-catalog)
* [i-wanna-be-notified-scripts](https://github.com/achimid/i-wanna-be-notified-scripts)

<!-- // TODO: Explicar sobre a arquitetura das aplicações, a comunicação entre elas, os processos asyncronos, o pool de workers. -->
