import { createDatabase } from "../config/database.js";

export class AlunoService {
    constructor() {
        // Cria uma instância do banco de dados
        this.db = createDatabase();
    }

    // Método para listar todos os alunos
    async listarAlunos() {
        try {
            // Query para selecionar todos os alunos
            const queryListarAlunos = `SELECT * FROM alunos`;
            // Executa a query e retorna todos os alunos
            const listaAlunos = this.db.prepare(queryListarAlunos).all();
            // Se não encontrar nenhum aluno, retorna null
            if (!listaAlunos) {
                return null
            }

            // Retorna todos os alunos
            return listaAlunos;
        } catch (error) {
            console.error("Erro ao listar alunos:", error);
            throw error;
        }
    }

    // Método para buscar aluno por ID
    async buscarAlunoPorId(id) {
        try {
            // Query para buscar aluno por ID
            const queryBuscarAlunoPorId = `SELECT * FROM alunos WHERE id = ?`;
            // Executa a query e retorna o aluno
            const aluno = this.db.prepare(queryBuscarAlunoPorId).get(id);
            // Se não encontrar o aluno, retorna null
            if (!aluno) {
                return null;
            }

            // Retorna o aluno
            return aluno;
        } catch (error) {
            console.error("Erro ao buscar aluno:", error);
            throw error;
        }
    }

    // Método para verificar se o aluno existe
    async alunoExistente(email) {
        try {
            // Query para buscar aluno por email
            const queryBuscarAlunoPorEmail = `SELECT * FROM alunos WHERE email = ?`;
            // Executa a query e retorna o aluno
            const aluno = this.db.prepare(queryBuscarAlunoPorEmail).get(email);
            // Se não encontrar o aluno, retorna null
            if (!aluno) {
                return null;
            }

            // Retorna o aluno
            return aluno;
        } catch (error) {
            console.error("Erro ao buscar aluno:", error);
            throw error;
        }
    }

    // Método para cadastrar aluno
    async cadastrarAluno(nome, email, curso, idade) {
        try {
            // Query para cadastrar aluno
            const queryCadastrarAluno = `INSERT INTO alunos (nome, email, curso, idade) VALUES (?, ?, ?, ?)`;
            // Executa a query e retorna o aluno
            const criarAluno = this.db.prepare(queryCadastrarAluno).run(nome, email, curso, idade);
            // Se não encontrar o aluno, retorna null
            if (!criarAluno) {
                throw new Error("Erro ao cadastrar aluno");
            }

            // Retorna o aluno criado
            return criarAluno;
        } catch (error) {
            console.error("Erro ao cadastrar aluno:", error);
            throw error;
        }
    }

    // Método para atualizar aluno
    async atualizarAluno(id, dados) {
       try {
         // Pega os dados da requisição
         const { nome, email, curso, idade } = dados;
         // Query para atualizar aluno
         const queryAtualizarAluno = `UPDATE alunos SET nome = ?, email = ?, curso = ?, idade = ? WHERE id = ?`;
         // Executa a query e retorna o aluno
         const atualizarAluno = this.db.prepare(queryAtualizarAluno).run(nome, email, curso, idade, id);
         // Se não encontrar o aluno, retorna null
         if (!atualizarAluno || atualizarAluno.changes === 0) {
             return null;
         }

         // Retorna o aluno atualizado
         return atualizarAluno;
       } catch (error) {
        console.error("Erro ao atualizar aluno:", error);
        throw error;
       }
    }

    // Método para deletar aluno
    async excluirAluno(id) {
       try {
         // Query para deletar aluno
         const queryExcluirAluno = `DELETE FROM alunos WHERE id = ?`;
         // Executa a query e retorna o aluno
         const excluirAluno = this.db.prepare(queryExcluirAluno).run(id);
         // Se não encontrar o aluno, retorna null
         if (!excluirAluno) {
             return null
         }
         
         // Retorna o aluno deletado
         return excluirAluno;
       } catch (error) {
        console.error("Erro ao excluir aluno:", error);
        throw error;
       }
    }
}
