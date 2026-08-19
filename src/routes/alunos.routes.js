import { Router } from "express";
import { AlunoController } from "../controllers/aluno.controller.js";

// Cria uma instância do Router para gerenciar rotas
const router = Router();
// Cria uma instância do AlunoController
const alunoController = new AlunoController();

// Rotas
router.get("/alunos", alunoController.listarAlunos);
router.get("/alunos/:id", alunoController.buscarAlunoPorId);
router.post("/alunos", alunoController.cadastrarAluno);
router.put("/alunos/:id", alunoController.atualizarAluno);
router.delete("/alunos/:id", alunoController.deletarAluno);

export default router;