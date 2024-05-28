# API Produção da Maturação

Projeto foi desenvolvido com intuito de facilitar o registro de produção diaria da maturação, uma api simples com autenticação de administrador, listagem, busca e edição de colaboradores e produção.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

### Rodando o Back End (servidor)

```bash
# Clone este repositorio
$ git clone https://github.com/edurodrigues0/api-maturation-production.git

# Acesse a pasta do projeto no terminal/cmd
$ cd api-maturation-production

# Instale as dependências
$ npm install

# Inicie o container do banco de dados no docker
$ docker compose up

# Rode as migration com o prisma
$ npx prisma migrate dev

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor iniciará na porta 3333 - acesse a documentação em <http://localhost:3333/documentation>
```

## ⚙️ Executando os testes e2e

Para executar os testes você precisará ter seguidos os passos acima e ter rodado a imagem do banco no docker e rode

```bash
$ npm run test
```

## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [Express](https://expressjs.com/pt-br/) - O framework web usado
* [Prisma](https://www.prisma.io/) - ORM usado para o banco de dados
* [Vitest](https://vitest.dev/guide/filtering) - Usado para fazer os testes e2e
* [Swagger](https://swagger.io/) - Para documentação da API
* [Zod](https://zod.dev/) - Para validação de tipagem

## ✒️ Autores

Mencione todos aqueles que ajudaram a levantar o projeto desde o seu início

* **Eduardo Rodrigues** - *Trabalho Inicial* - [edurodrigues0](https://github.com/edurodrigues0)

## 📄 Licença

[LICENSE.md](https://github.com/usuario/projeto/licenca) para detalhes.
