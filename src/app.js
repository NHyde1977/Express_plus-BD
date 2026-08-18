import express from "express"; //importa Express

const app = express();
app.use(express.json());// faz o Express interpretar requisições cujo corpo venha em JSON

const alunos = [
    { id: 1, nome: "Bruno", curso: "ADS" },
    { id: 2, nome: "Maria", curso: "ADS" },
    { id: 3, nome: "Lara", curso: "ADS" },
    { id: 4, nome: "José", curso: "ADS" }
];

function buscarIndexAluno(id) {
    return alunos.findIndex(aluno => aluno.id == id);
}

app.get("/", (req, res) => { //primeira rota
    res.send("Minha API REST com Express"); //a resposta enviada
});

app.get("/alunos", (req, res) => {
    res.status(200).send(alunos);
}); // Quando chegar uma requisição HTTP GET em /alunos
    // envie a lista alunos e informe que a requisição foi bem-sucedida com o status HTTP 200.

app.post("/alunos", (req, res) => {
    const novoAluno = req.body;

    alunos.push(novoAluno);

    res.status(201).send(novoAluno);
});

app.get("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const aluno = alunos.find(aluno => aluno.id === id);

    if (!aluno) {
        return res.status(404).send("Cadastro não foi localizado");
    }

    res.status(200).send(aluno);
});

app.put("/alunos/:id", (req, res) => {
    let index = buscarIndexAluno(req.params.id);

    if (index === -1) {
    return res.status(404).send("Cadastro não foi localizado");
}

    alunos[index].nome = req.body.nome;
    alunos[index].curso = req.body.curso;
    

    res.send(alunos);
});

app.delete("/alunos/:id", (req, res) => {
    let index = buscarIndexAluno(req.params.id);

    if (index === -1) {
    return res.status(404).send("Cadastro não foi localizado");
}

    alunos.splice(index, 1);

    res.send(alunos);
});

export default app; //vai exportar a aplicação para o app que for usá-la