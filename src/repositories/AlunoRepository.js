import pool from '../database/pool.js'

class AlunoRepository {
  async findAll({ nome, curso } = {}) {
  let sql = 'SELECT id, nome, curso, cpf FROM alunos'
  const params = []

  const conditions = []

  if (nome) {
    conditions.push('nome LIKE ?')
    params.push(`%${nome}%`)
  }

  if (curso) {
    conditions.push('curso LIKE ?')
    params.push(`%${curso}%`)
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`
  }

  sql += ' ORDER BY id'

  const [rows] = await pool.execute(sql, params)

  return rows
}

  async findById(id) {
    const [rows] = await pool.execute(
      'SELECT id, nome, curso, cpf FROM alunos WHERE id = ?',
      [id]
    )

    return rows[0] ?? null
  }

  async findByCpf(cpf) {
    const [rows] = await pool.execute(
      'SELECT id, nome, curso, cpf FROM alunos WHERE cpf = ?',
      [cpf]
    )

    return rows[0] ?? null
  }

  async create({ nome, curso, cpf }) {
    const [result] = await pool.execute(
      `
        INSERT INTO alunos (nome, curso, cpf)
        VALUES (?, ?, ?)
      `,
      [nome, curso, cpf]
    )

    return {
      id: result.insertId,
      nome,
      curso,
      cpf
    }
  }

  async update(id, { nome, curso, cpf }) {
    const [result] = await pool.execute(
      `
        UPDATE alunos
        SET nome = ?, curso = ?, cpf = ?
        WHERE id = ?
      `,
      [nome, curso, cpf, id]
    )

    if (result.affectedRows === 0) {
      return null
    }

    return this.findById(id)
  }

  async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM alunos WHERE id = ?',
      [id]
    )

    return result.affectedRows > 0
  }
}

export default new AlunoRepository()