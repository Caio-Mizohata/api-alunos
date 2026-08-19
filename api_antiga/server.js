import express from "express";

// Criando a aplicação Express
const app = express();

// Porta onde a API será executada
const PORT = 3000;

// Permite que a API receba dados no formato JSON
app.use(express.json());


// ==============================
// DADOS DOS ALUNOS
// ==============================

let alunos = [
    {
        id: 1,
        nome: "João Silva",
        email: "joao@email.com",
        curso: "Análise e Desenvolvimento de Sistemas",
        idade: 20
    },
    {
        id: 2,
        nome: "Maria Souza",
        email: "maria@email.com",
        curso: "Big Data no Agronegócio",
        idade: 21
    },
    {
        id: 3,
        nome: "Pedro Santos",
        email: "pedro@email.com",
        curso: "Big Data no Agronegócio",
        idade: 19
    }
];


// ==============================
// GET - LISTAR TODOS OS ALUNOS
// ==============================

app.get('/alunos', (req, res) => {
    res.status(200).json(alunos);
});


// ==============================
// GET - BUSCAR ALUNO POR ID
// ==============================

app.get('/alunos/:id', (req, res) => {

    const id = Number(req.params.id);

    const aluno = alunos.find(aluno => aluno.id === id);

    if (!aluno) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    res.status(200).json(aluno);
});


// ==============================
// POST - CADASTRAR NOVO ALUNO
// ==============================

app.post('/alunos', (req, res) => {

    const { nome, email, curso, idade } = req.body;

    // Validação simples
    if (!nome || !email || !curso || !idade) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    const novoAluno = {
        id: alunos.length > 0
            ? Math.max(...alunos.map(aluno => aluno.id)) + 1
            : 1,

        nome,
        email,
        curso,
        idade
    };

    alunos.push(novoAluno);

    res.status(201).json({
        mensagem: "Aluno cadastrado com sucesso",
        aluno: novoAluno
    });
});


// ==============================
// PUT - ATUALIZAR ALUNO
// ==============================

app.put('/alunos/:id', (req, res) => {

    const id = Number(req.params.id);

    const aluno = alunos.find(aluno => aluno.id === id);

    if (!aluno) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    const { nome, email, curso, idade } = req.body;

    if (!nome || !email || !curso || !idade) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    aluno.nome = nome;
    aluno.email = email;
    aluno.curso = curso;
    aluno.idade = idade;

    res.status(200).json({
        mensagem: "Aluno atualizado com sucesso",
        aluno
    });
});


// ==============================
// DELETE - EXCLUIR ALUNO
// ==============================

app.delete('/alunos/:id', (req, res) => {

    const id = Number(req.params.id);

    const index = alunos.findIndex(aluno => aluno.id === id);

    if (index === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    const alunoRemovido = alunos[index];

    alunos.splice(index, 1);

    res.status(200).json({
        mensagem: "Aluno excluído com sucesso",
        aluno: alunoRemovido
    });
});


// ==============================
// INICIAR SERVIDOR
// ==============================

app.listen(PORT, () => {
    console.log(`API de Alunos rodando em http://localhost:${PORT}`);
});