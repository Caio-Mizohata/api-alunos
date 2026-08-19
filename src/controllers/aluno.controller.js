import { AlunoService } from "../services/aluno.service.js";

export class AlunoController {
  // Cria uma instância do AlunoService
  constructor() {
    this.alunoService = new AlunoService();
    // Precisamos usar o .bind para garantir que o this seja o controller
    this.listarAlunos = this.listarAlunos.bind(this);
    this.buscarAlunoPorId = this.buscarAlunoPorId.bind(this);
    this.cadastrarAluno = this.cadastrarAluno.bind(this);
    this.atualizarAluno = this.atualizarAluno.bind(this);
    this.deletarAluno = this.deletarAluno.bind(this);
  }

  // Método para listar todos os alunos
  async listarAlunos(req, res) {
    try {
      // Chama a função listarAlunos do aluno.service
      const listarAlunos = await this.alunoService.listarAlunos()

      // Se não encontrar nenhum aluno, retorna 404
      if (!listarAlunos || listarAlunos.length === 0) {
        return res.status(404).json({
          message: "Nenhum aluno encontrado!"
        })
      }

      // Retorna 200 com a mensagem de sucesso
      return res.status(200).json(listarAlunos)

    } catch (error) {
      console.error("Erro ao listar alunos:", error)
      return res.status(500).json({
        message: "Erro ao listar alunos"
      })
    }
  }

  // Método para buscar aluno por ID
  async buscarAlunoPorId(req, res) {
    try {
      // Busca o ID na requisição
      const { id } = req.params;
      // Formata o ID para o tipo numérico inteiro
      const idFormatado = Number(id);

      // Chama a função buscarAlunoPorId do aluno.service
      const buscarAlunoPorId = await this.alunoService.buscarAlunoPorId(idFormatado);

      // Se não encontrar o aluno, retorna 404
      if (!buscarAlunoPorId || buscarAlunoPorId.length === 0) {
        return res.status(404).json({
          message: "Aluno não encontrado!"
        })
      }

      // Retorna 200 com a mensagem de sucesso
      return res.status(200).json(buscarAlunoPorId)
    } catch (error) {
      console.error("Erro ao buscar aluno:", error)
      return res.status(500).json({
        message: "Erro ao buscar aluno"
      })
    }
  }

  // Método para cadastrar um novo aluno
  async cadastrarAluno(req, res) {
    const { nome, email, curso, idade } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !email || !curso || !idade) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios!"
      })
    }

    // Verifica se o aluno já existe
    const alunoExistente = await this.alunoService.alunoExistente(email);

    if (alunoExistente) {
      return res.status(400).json({
        message: "Este aluno já está cadastrado"
      })
    }

    // Cadastra o novo aluno
    const cadastrarAluno = await this.alunoService.cadastrarAluno(nome, email, curso, idade);

    // Retorna 201 com a mensagem de sucesso
    return res.status(201).json({
      message: "Aluno cadastrado com sucesso!",
      status: cadastrarAluno
    })
  }

  // Método para atualizar um aluno
  async atualizarAluno(req, res) {
    try {
      const { id } = req.params;
      const idFormatado = Number(id);

      // Verifica se o aluno existe
      const alunoExistente = await this.alunoService.buscarAlunoPorId(idFormatado);

      // Se o aluno não existir, retorna 404
      if (!alunoExistente) {
        return res.status(404).json({
          message: "Aluno não encontrado para atualizar!"
        })
      }

      // Pega os dados da requisição que serão atualizados
      const { nome, email, curso, idade } = req.body;

      // Cria um objeto com os dados atualizados
      const dadosAlunosAtualizados = {
        nome: nome,
        email: email,
        curso: curso,
        idade: idade
      }

      // Atualiza o aluno
      const alunoAtualizado = await this.alunoService.atualizarAluno(idFormatado, dadosAlunosAtualizados);

      // Retorna 200 com a mensagem de sucesso
      return res.status(200).json({
        message: `Dados do aluno atualizados com sucesso!`,
        data: dadosAlunosAtualizados,
        status: alunoAtualizado
      });

    } catch (error) {
      console.error("Erro ao atualizar aluno:", error)
      return res.status(500).json({
        message: "Erro ao atualizar aluno"
      })
    }
  }

  // Método para deletar um aluno
  async deletarAluno(req, res) {
    try {
      const { id } = req.params;
      const idFormatado = Number(id);

      // Verifica se o aluno existe
      const alunoExistente = await this.alunoService.buscarAlunoPorId(idFormatado);

      // Se o aluno não existir, retorna 404
      if (!alunoExistente) {
        return res.status(404).json({
          message: "Aluno não encontrado para deletar!"
        })
      }

      // Deleta o aluno
      const alunoDeletado = await this.alunoService.excluirAluno(idFormatado);

      // Retorna 200 com a mensagem de sucesso
      return res.status(200).json({
        message: "Aluno deletado com sucesso!",
        data: alunoDeletado
      })
    } catch (error) {
      console.error("Erro ao deletar aluno:", error)
      return res.status(500).json({
        message: "Erro ao deletar aluno"
      })
    }
  }
}
