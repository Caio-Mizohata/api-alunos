# API de Alunos

## Visão geral
Este projeto implementa uma API RESTful para gerenciamento de alunos utilizando **Node.js**, **Express** e **SQLite**. Todos os arquivos foram comentados detalhadamente (JSDoc e comentários de linha) para facilitar a compreensão do fluxo de execução.

## Pré‑requisitos
- **Node.js** (versão 18 ou superior) e **npm** instalados.
- Git (opcional, caso queira clonar o repositório).

## Instalação
```bash
# Clone o repositório (se ainda não estiver local)
git clone <url-do-repositorio>
cd api-alunos

# Instale as dependências
npm install
```

## Execução da aplicação
```bash
# Iniciar o servidor
node src/server.js
```
O servidor iniciará na porta **3000** e exibirá:
```
Aplicação rodando em http://localhost:3000
```

## Rotas disponíveis
| Método | Rota | Descrição | Exemplo `curl` |
|--------|------|-----------|---------------|
| `GET` | `/alunos` | Lista todos os alunos cadastrados. | `curl http://localhost:3000/alunos` |
| `GET` | `/alunos/:id` | Busca um aluno pelo ID. | `curl http://localhost:3000/alunos/1` |
| `POST` | `/alunos` | Cadastra um novo aluno. | `curl -X POST -H "Content-Type: application/json" -d '{"nome":"Ana","email":"ana@example.com","curso":"Engenharia","idade":22}' http://localhost:3000/alunos` |
| `PUT` | `/alunos/:id` | Atualiza os dados de um aluno existente. | `curl -X PUT -H "Content-Type: application/json" -d '{"nome":"Ana Silva","email":"ana.silva@example.com","curso":"Engenharia", "idade":23}' http://localhost:3000/alunos/1` |
| `DELETE` | `/alunos/:id` | Remove um aluno do banco de dados. | `curl -X DELETE http://localhost:3000/alunos/1` |

> **Obs.:** No método **PUT** você pode atualizar qualquer campo individualmente; basta enviar ao menos um campo no corpo da requisição.


## Banco de dados
- O banco SQLite (`alunos.db`) é criado automaticamente na primeira execução, caso ainda não exista.
- A tabela **alunos** possui os campos:
  - `id` (INTEGER, PK, autoincrement)
  - `nome` (TEXT, NOT NULL)
  - `email` (TEXT, NOT NULL)
  - `curso` (TEXT, NOT NULL)
  - `idade` (INTEGER, NOT NULL)

## Estrutura de diretórios
```
api-alunos/
├─ src/
│  ├─ config/            # Configurações (ex.: criação do banco)
│  ├─ controllers/       # Camada de controle – contém a classe AlunoController
│  ├─ routes/            # Definição das rotas Express
│  ├─ services/          # Camada de serviço – lógica de acesso ao banco
│  ├─ app.js             # Configuração do Express (middlewares)
│  └─ server.js          # Inicialização do servidor e tratamento de shutdown
├─ alunos.db              # Banco SQLite (gerado em tempo de execução)
├─ package.json
└─ README.md             # Este arquivo
```
