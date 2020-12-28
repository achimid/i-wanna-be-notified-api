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
 
A API permite que você cadastre intenções de monitoramento, o que na documentação é chamado de monitoramento (`/monitoring`), a request determina como o monitoramento será executado, qual a periodicidade, qual o alvo (Url do site), quais os scripts que serão executados no alvo, e como será efetuada a notificação após obter as informações do alvo.
 
Após cadastrar a intenção de monitoramento (monitoring), quando chegar a hora de executar, será criado uma execução (`/execution`), essa execution é a operação de fato, ou seja, a aplicação irá acessar o site informado, executar os scripts informados, obter o conteúdo da pagina, se necessário irá interpretar o conteudo extraido criando novas execuções. No futuro essa execution será utilizada para efetuar os disparos das notificações. É possivel que um monitoramento tenha diversas execuções.
 
<!-- Existe a possibilidade de criar um usuário na aplicação, para que o usuário possa gerenciar todos os monitoramentos cadastrados, mas também é possível criar um monitoramento anônimo. Para identificação do usuário é necessário informar no header `Authentication` o Token JWT fornecido no momento da autenticação.  -->

<!-- Com a utilização de um usuário é possível centralizar algumas operações como por exemplo, notificações e filtros. Ao cadastrar um filtro para o usuário, todas suas request irão respeitar esse filtro, exceto quando ela tiver um filtro próprio. Também é possível cadastrar notificações para o usuário, e quando a request não tiver uma notificação própria ele utilizará a cadastrada para o usuário. -->
 
As operações são realizadas de uma forma assincrona, onde um monitoramento é cadastrado e de tempos em tempos ele irá criar uma execução e acessar a pagina e extrair as informações, assim que cada execução é finalizada, será enviado uma notificação conforme cadastrado no monitoramento. 

Dito isso, é possivel utilizar um endpoint para tornar o processo sincrono e esperar as execuções terminarem, mas é valido ressaltar que o endpoint tem um **timeout request** de **30 segundos** e o endpoint em questão não é performático.


 
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

------
## <b>Cadastrar novo monitoramento </b> 
Este endpoint deve ser utilizado para cadastrar um novo monitoramento de pagina e suas configurações especificas.

```
POST    /monitoring     Content-Type: application/json
```

~~~json
{
    "url": "http://google.com"
}
~~~


<details>
    <summary><b>Exemplo de requisição - Simples</b></summary>    

~~~json
Request:
{
    "url": "http://google.com"
}


Response:
{
    "extractedTarget": "asasdasd",
    "isSuccess": true,
    "uuid": "5486acab-2491-4749-a072-9e96ca06a267",
    "executionTime": "1535ms",
    "extractedContent": []
}
~~~
</details> 

<details>
    <summary><b>Exemplo de requisição - Completo</b></summary>    

~~~json
Request:
{
    "url": "http://google.com"
}


Response:
{
    "extractedTarget": "asasdasd",
    "isSuccess": true,
    "uuid": "5486acab-2491-4749-a072-9e96ca06a267",
    "executionTime": "1535ms",
    "extractedContent": []
}
~~~
</details> 

<details>
    <summary><b>Exemplo de requisição - Código Javascript</b></summary>    

~~~javascript
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(
    {
        "url":"http://google.com",
        "scriptTarget":"[...document.querySelectorAll('a')].map(e => e.href)"
    });

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://i-wanna-be-notified-api-01.herokuapp.com/api/v1/monitoring/sync", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
~~~
</details> 


 

--------------
## Documentação Swagger

[Documentação da API - Swagger](http://iwannabenotified.ddns.net/api/v1/docs)

#### Funcionamento

// TODO - Explicar a utilização do puppeteer, dos workers, do fallback da api, das options, sobre o filtro de similaridade, sobre a linguagem do projeto.... Sobre as integrações, sobre o usuário




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