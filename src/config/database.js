import { DatabaseSync } from "node:sqlite";

export function createDatabase() {
    // Cria a conexão com o banco de dados SQLITE localmente, se ele não existir, cria um novo
    const database = new DatabaseSync('./alunos.db', { timeout: 5000 });

    // Cria a tabela alunos se ela não existir
    const criarDatabaseQuery =
        `CREATE TABLE IF NOT EXISTS alunos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT NOT NULL,
          curso TEXT NOT NULL,
          idade INTEGER NOT NULL
        ) STRICT;`;

    // Tenta criar o banco de dados e a tabela
    try {
        database.exec(criarDatabaseQuery, (error) => {
        if (error) {
            console.error("Erro ao criar banco de dados:", error);
            throw error;
        } else {
            console.log("Banco de dados criado com sucesso");
        }
    });
    return database;
    } catch (error) {
        console.error("Erro ao criar banco de dados:", error);
        throw error;
    }
}
