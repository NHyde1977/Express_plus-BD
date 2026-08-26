import alunoRepository from '../repositories/AlunoRepository.js'

class AlunoService {
  async findAll({ nome, curso } = {}) {
  return alunoRepository.findAll({
    nome,
    curso
  })
}

  async findById(id) {
    return alunoRepository.findById(id)
  }

  async create({ nome, curso, cpf }) {
    if (!nome || !curso || !cpf) {
      throw new Error('Nome, curso e CPF são obrigatórios')
    }

    if (!/^\d{11}$/.test(cpf)) {
      throw new Error('CPF deve conter exatamente 11 dígitos')
    }

    const cpfExistente = await alunoRepository.findByCpf(cpf)

    if (cpfExistente) {
      throw new Error('CPF já cadastrado')
    }

    return alunoRepository.create({
      nome,
      curso,
      cpf
    })
  }

  async update(id, { nome, curso, cpf }) {
    if (!nome || !curso || !cpf) {
      throw new Error('Nome, curso e CPF são obrigatórios')
    }

    if (!/^\d{11}$/.test(cpf)) {
      throw new Error('CPF deve conter exatamente 11 dígitos')
    }

    const alunoExistente = await alunoRepository.findById(id)

    if (!alunoExistente) {
      return null
    }

    const cpfExistente = await alunoRepository.findByCpf(cpf)

    if (cpfExistente && cpfExistente.id !== id) {
      throw new Error('CPF já cadastrado')
    }

    return alunoRepository.update(id, {
      nome,
      curso,
      cpf
    })
  }

  async delete(id) {
    return alunoRepository.delete(id)
  }
}

export default new AlunoService()