const generateUniqueId = require('../utils/generateUniqueId')
const connection  = require('../database/connection')

module.exports = {
  async index(request, response) {
  const concessionarias = await connection('concessionarias').select('*')

  return response.json(concessionarias)
 },

  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body

    const id = generateUniqueId()

    await connection('concessionarias').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return response.json({ id })
  }
}
