# Mongo Market

API que possibilita um CRUD simples utilizando-se dos bancos PostgreSQL, Redis e MongoDB em um domínio market place.

# Instalando dependências

```
$ npm i
```

# Configurando varáveis de configuração

Crie um arquivo ".env" na raiz da api e o configure com as seguintes variáveis:

PORT= Porta da aplicação  
  
PG_USERNAME= Nome do usuário do PostgreSQL  
PG_PASSWORD= Senha do PostgreSQL  
PG_HOST= HOST do banco do PostgreSQL  
PG_PORT= Porta do servidor do PostgreSQL  
PG_NAME= Nome do banco do PostgreSQL  
  
REDIS_HOST= HOST do servidor Redis  
REDIS_PORT= Porta do servidor Redis  
  
MONGO_HOST= HOST do servidor MongoDB  
MONGO_PORT= Porta do servidor MongoDB
MONGO_DATABASE= Nome do banco do MongoDB  

# Configurando bancos de dados

**Script de criação da tabela product no PostgreSQL:**

CREATE TABLE product(
	id SERIAL PRIMARY KEY,
	product_name VARCHAR(50),
	quantity INTEGER,
	price REAL
);

**Comandos para criação do banco e coleções no MongoDB**

No terminal do mongo, execute:

$ use NOME_DO_BANCO
$ db.createCollection("Client")
$ db.createCollection("Order")

# Executando o projeto

```
$ npm start
```
