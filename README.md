# Desafio Técnico Oper - Sistema de Delivery Aéreo

## 1. Descrição

Este repositório contém a solução completa para o desafio técnico proposto pela Oper. O projeto é uma aplicação full-stack que simula um sistema de gerenciamento para um serviço de delivery aéreo de cartas, utilizando pombos-correio.

A aplicação é composta por uma API RESTful no backend para gerenciar as entidades e regras de negócio, e um Single-Page Application (SPA) no frontend para interação do usuário.

## 2. Funcionalidades Principais

- **Gerenciamento de Pombos-Correio:** CRUD completo para os pombos, incluindo cadastro com foto opcional, atualização de dados e a funcionalidade de "aposentar" um pombo, que o torna indisponível para novos envios.
- **Gerenciamento de Clientes:** CRUD completo para os clientes do serviço.
- **Envio e Gerenciamento de Cartas:** Sistema de cadastro de cartas associando remetente, informações do destinatário e o pombo responsável pela entrega, e atualização de status (`na fila`, `enviado`, `entregue`).
- **Dashboard de Análise:** Uma página de dashboard que apresenta estatísticas de negócio, como o ranking de pombos mais ativos e um resumo do status das entregas.

## 3. Arquitetura e Decisões Técnicas

A pilha de tecnologias foi escolhida para alinhar-se com os requisitos e sugestões do desafio, focando em boas práticas e manutenibilidade.

### Backend
- **Framework:** **NestJS** foi escolhido por sua arquitetura modular, uso de Design Patterns e excelente integração com TypeScript, promovendo um código organizado e escalável.
- **ORM e Banco de Dados:** **Prisma** com **SQLite** foi a escolha para a camada de dados. Prisma oferece alta produtividade e segurança de tipos, enquanto SQLite foi selecionado para sua simplicidade e natureza baseada em arquivos, evitando configurações complexas.
- **Upload de Arquivos:** A funcionalidade de upload de fotos foi implementada com **Multer**, salvando os arquivos localmente para manter a simplicidade da solução.

### Frontend
- **Framework:** **React.js**, conforme solicitado, utilizando a arquitetura de componentes e hooks para gerenciar o estado e o ciclo de vida da aplicação.
- **Linguagem:** **TypeScript** foi adotado para garantir a segurança de tipos e melhorar a clareza e a manutenibilidade do código.
- **Padrões de Código:** Foram criados **Hooks Customizados** (`useTableSort`, `useEntityManagement`) e **Componentes Reutilizáveis** (`DataTable`) para abstrair lógicas repetitivas, aderindo ao princípio DRY (Don't Repeat Yourself) e simplificando a lógica dos componentes.

### DevOps
- **Containerização:** A aplicação foi totalmente containerizada com **Docker** e **Docker Compose**, conforme a sugestão, para garantir um ambiente de execução consistente e simplificar o processo de setup. Foram utilizadas *multi-stage builds* para criar imagens de produção otimizadas.

## 4. Como Executar o Projeto

**Pré-requisitos:**
- Docker
- Docker Compose

**Instruções:**

1.  Clone este repositório.
2.  Na pasta raiz do projeto, execute o seguinte comando para construir as imagens e iniciar os contêineres:
    ```bash
    docker-compose up --build
    ```
3.  Aguarde a finalização do processo. A aplicação estará acessível nos seguintes endereços:
    - **Frontend:** `http://localhost:8080`
    - **Backend:** `http://localhost:3000`

## 5. Resumo dos Endpoints da API

| Método | Endpoint                    | Descrição                                    |
|--------|-----------------------------|----------------------------------------------|
| `GET`  | `/pombos`                   | Lista todos os pombos.                         |
| `POST` | `/pombos`                   | Cadastra um novo pombo (com foto opcional).    |
| `PATCH`| `/pombos/:id`               | Atualiza os dados de um pombo.                 |
| `GET`  | `/clientes`                 | Lista todos os clientes.                       |
| `POST` | `/clientes`                 | Cadastra um novo cliente.                      |
| `GET`  | `/cartas`                   | Lista todas as cartas.                         |
| `POST` | `/cartas`                   | Cria uma nova carta.                           |
| `PATCH`| `/cartas/:id`               | Atualiza os dados de uma carta (ex: status).   |
| `GET`  | `/dashboard`                | Retorna os dados de análise do dashboard.      |

---
Desenvolvido por **Lucas Martins de Andrade**.