import app from "./app.js";
import { createDatabase } from "./config/database.js";

let server; // instancia do HTTP server
let db;     // conexão ao SQLite (DatabaseSync)

// Método para encerrar o servidor e o banco de dados de forma controlada
const gracefulShutdown = async (signal) => {
  console.log(`\nRecebido ${signal} – encerrando aplicação…`);
  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      });
      console.log("Servidor HTTP fechado.");
    }

    // Se o banco de dados estiver aberto, fecha a conexão
    if (db) {
      db.close();
      console.log("Conexão ao banco de dados fechada.");
    }

    // Encerra o processo
    process.exit(0);
  } catch (err) {
    console.error("Erro durante o graceful shutdown:", err);
    process.exit(1);
  }
};

// Método para iniciar o servidor e o banco de dados
const iniciarServidor = async () => {
  const PORTA = 3000;
  try {
    // Cria o banco de dados
    db = createDatabase();

    // Inicia o servidor
    server = app.listen(PORTA, () => {
      console.log(`Aplicação rodando em http://localhost:${PORTA}`);
    });

    // Captura os sinais de término para encerramento controlado
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

iniciarServidor();
