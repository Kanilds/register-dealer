const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const concessionaria_id = request.headers.authorization

    const carros = await connection('carros').where('concessionaria_id', concessionaria_id)
    .select('*')

  return response.json(carros)
  }
}