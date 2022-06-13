const connection = require('../database/connection')

module.exports = {
  async create(request, response) {
    const { id } = request.body

    const concessionaria = await connection('concessionarias')
      .where('id', id)
      .select('name')
      .first()

    if (!concessionaria) {
      return response.status(400).json({ error: 'No concessionaria found with this ID' })
    }

    return response.json(concessionaria)
  }
}