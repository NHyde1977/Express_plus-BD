import alunoService from '../services/AlunoService.js'

class AlunoController {
  async index(req, res) {
  const { nome, curso } = req.query

  const alunos = await alunoService.findAll({
    nome,
    curso
  })

  return res.status(200).json(alunos)
}

  async show(req, res) {
    const id = Number(req.params.id)

    const aluno = await alunoService.findById(id)

    if (!aluno) {
      return res.status(404).json({
        mensagem: 'Aluno não encontrado'
      })
    }

    return res.status(200).json(aluno)
  }

  async store(req, res) {
    try {
      const { nome, curso, cpf } = req.body

      const aluno = await alunoService.create({
        nome,
        curso,
        cpf
      })

      return res
        .location(`/alunos/${aluno.id}`)
        .status(201)
        .json(aluno)
    } catch (error) {
      return res.status(400).json({
        mensagem: error.message
      })
    }
  }

  async update(req, res) {
    try {
      const id = Number(req.params.id)

      const { nome, curso, cpf } = req.body

      const aluno = await alunoService.update(id, {
        nome,
        curso,
        cpf
      })

      if (!aluno) {
        return res.status(404).json({
          mensagem: 'Aluno não encontrado'
        })
      }

      return res.status(200).json(aluno)
    } catch (error) {
      return res.status(400).json({
        mensagem: error.message
      })
    }
  }

  async delete(req, res) {
    const id = Number(req.params.id)

    const removido = await alunoService.delete(id)

    if (!removido) {
      return res.status(404).json({
        mensagem: 'Aluno não encontrado'
      })
    }

    return res.status(204).send()
  }
}

export default new AlunoController()