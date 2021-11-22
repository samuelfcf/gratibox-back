<h1 align="center">API Gratibox</h1>

## 🔖 Sobre

API de serviço de assinatura de produtos naturais e artesinais como chás e incensos e produtos orgânicos em geral. Permite cadastro e login de usuários e disponibiliza enpoints para efetuar a assinatura e listar todos os detalhes da mesma. A API conta com testes automatizados em todas as rotas e utiliza alguns conceitos de Design Patterns como repositories, services e controllers. Esse projeto foi desenvolvido para alimentar o front-end disponível em: https://github.com/samuelfcf/gratibox-front

## 🛠 Tecnologias utilizadas

O projeto foi desenvolvido usando as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Joi](https://joi.dev/)
- [Husky](https://www.npmjs.com/package/husky)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Jest](https://jestjs.io/pt-BR/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [PostgreSQL](https://www.postgresql.org/)

## 🛣️ Rotas

Requisições para a API devem seguir os padrões:
| Método | Caminho | Descrição | Corpo da requisição
|---|---|---|---|
| `POST` | /sing-up | Cadastro de usuários | `{ name: , email: , password: }` |
| `POST` | /sign-in | Faz login no sistema | `{ email: , password: }` |
| `POST` | /sub/:userId | Cria registro de assinatura do cliente. Necessita que o id do usuário seja enviado como parâmetro na rota e que o token da sessão seja enviado no cabeçalho da requisição. | `{ "planId": ,"deliveryDay": ,"deliveryCEP": ,"deliveryNumber": ,"deliveryAddress": , "deliveryRecipient": , "productsIds": }` |
| `GET` | /sub/:userId | Retorna todos os dados da assinatura do cliente. Necessita que o id do usuário seja enviado como parâmetro na rota e que o token da sessão seja enviado no cabeçalho da requisição. | |

## 📦 Como baixar e executar o projeto 

```bash

  # Clonar repositório
  $ git clone https://github.com/samuelfcf/gratibox-back

  # Entrar no diretório do projeto
  $ cd gratibox-back

  # Instalar dependências
  $ yarn install

  # Iniciar o projeto
  $ yarn start:dev
```

---

Desenvolvido com ❤️ por Samuel Felipe Castro Fernandes.
