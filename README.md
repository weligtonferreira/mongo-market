# Mongo Market

Aplicação back-end para a disciplina de Banco de Dados II

<h2>Iniciando</h2>

Foi usado outro repositório como API para o fornecimento dos dados pelo PostgreSQL e Redis como cache-aside, então você vai precisar dele rodando para o cadastramento de pedidos dessa aplicação. O repositório escolhido pela equipe foi o do cache-market que se encontra no link https://github.com/RicardoBrasileiro/cachemarket

<h2>Tabelas do banco</h2>

A aplicação foi desenvolvida com mongoose para conexão com o MongoDB, nos models ficaram as seguintes colunas para os documentos:

Tabela **clients**

Colunas:

| Nome     | Tipo      |
|:--------:|:---------:|
| name     | String    |
| cpf      | String    |
| email    | String    |
| password | String    |

Tabela **orders**

Colunas:

| Nome     | Tipo      |
|:--------:|:---------:|
| clientId | String    |
| products | Array     |
| amount   | Number    |

<strong>
Observação: A coluna amount não precisa ser preenchida, a aplicação faz a soma automática do valor dos produtos, já a coluna products recebe um Array de Objetos com os campos code e quantity nos objetos representando o código e a quantidade de determinado produto, por exemplo:  
  
products: [  
    { code: "1234", quantity: 10 },  
    { code: "5678", quantity: 5 }  
]  
</strong>

<h2>Instalação das dependências</h2>

Rodar o seguinte comando no terminal:

$ npm i

<h2>Variáveis de ambiente</h2>

Criar arquivo .env na raiz da pasta com as seguintes variáveis:

API_URL={Endereço em que o cache-market está rodando, por exemplo: http://localhost:3000}  
PORT={Porta em que a aplicação vai rodar}  
MONGO_HOST={Servidor em que o MongoDB está rodando. Ex: localhost ou endereço físico}  
MONGO_NAME={Nome do banco em que vão ser criadas as tabelas}  

<h2>Executar</h2>

Rodar o seguinte comando no terminal:

$ npm start
