
const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('CONCESSIONARIA', () => {
  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create a new CONCESSIONARIA', async () => {
    const response = await request(app).post('/concessionarias').send({
	    name: "FORD",
	    email: "contato@ford.com",
	    whatsapp: "4700000000",
	    city: "Rio do Sul",
	    uf: "SC"
    })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
