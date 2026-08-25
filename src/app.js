import express from 'express'

const app = express()

// Permite que o Express interprete requisições com corpo em JSON
app.use(express.json())

// Dados temporários em memória
const alunos = [
  { id: 1, nome: 'Bruno', curso: 'ADS' },
  { id: 2, nome: 'Maria', curso: 'ADS' },
  { id: 3, nome: 'Lara', curso: 'ADS' },
  { id: 4, nome: 'José', curso: 'ADS' }
]

// Localiza a posição de um aluno no array pelo ID
function buscarIndexAluno(id) {
  return alunos.findIndex(aluno => aluno.id == id)
}

// Rota principal
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API REST funcionando'
  })
})

// Lista todos os alunos
app.get('/alunos', (req, res) => {
  res.status(200).send(alunos)
})

// Cadastra um novo aluno
app.post('/alunos', (req, res) => {
  const novoAluno = req.body

  alunos.push(novoAluno)

  res.status(201).send(novoAluno)
})

// Busca um aluno pelo ID
app.get('/alunos/:id', (req, res) => {
  const id = parseInt(req.params.id)

  const aluno = alunos.find(aluno => aluno.id === id)

  if (!aluno) {
    return res.status(404).send('Cadastro não foi localizado')
  }

  res.status(200).send(aluno)
})

// Atualiza um aluno
app.put('/alunos/:id', (req, res) => {
  const index = buscarIndexAluno(req.params.id)

  if (index === -1) {
    return res.status(404).send('Cadastro não foi localizado')
  }

  alunos[index].nome = req.body.nome
  alunos[index].curso = req.body.curso

  res.send(alunos)
})

// Exclui um aluno
app.delete('/alunos/:id', (req, res) => {
  const index = buscarIndexAluno(req.params.id)

  if (index === -1) {
    return res.status(404).send('Cadastro não foi localizado')
  }

  alunos.splice(index, 1)

  res.send(alunos)
})

export default app