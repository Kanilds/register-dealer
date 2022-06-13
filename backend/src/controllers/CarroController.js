const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query

    const [count] = await connection('carros').count()

    const carros = await connection('carros')
      .join('concessionarias', 'concessionarias.id', '=', 'carros.concessionaria_id')
      .limit(5)
      .offset((page - 1) * 5 )
      .select([
        'carros.*',
        'concessionarias.name',
        'concessionarias.email',
        'concessionarias.whatsapp',
        'concessionarias.city',
        'concessionarias.uf'
      ])

    response.header('X-Total-Count', count['count(*)'])

    return response.json(carros)
  },

  async create(request, response) {
    const { title, description, value } = request.body
    const concessionaria_id = request.headers.authorization

    const [id] = await connection('carros').insert({
      title,
      description,
      value,
      concessionaria_id,
    })

    return response.json({ id })
  },

  async delete(request, response) {
    const { id } = request.params
    const concessionaria_id = request.headers.authorization

    const carro = await connection('carros')
      .where('id', id)
      .select('concessionaria_id')
      .first()

    if (carro.concessionaria_id != concessionaria_id) {
      return response.status(401).json({ error: 'Operation not permitted.' })
    }

    await connection('carros').where('id', id).delete()

    return response.status(204).send()
  }
}