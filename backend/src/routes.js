const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const ConcessionariaController = require('./controllers/ConcessionariaController')
const CarroController = require('./controllers/CarroController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/concessionarias', ConcessionariaController.index)
routes.post('/concessionarias', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), ConcessionariaController.create)

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index)

routes.get('/carros', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), CarroController.index)

routes.post('/carros', CarroController.create)

routes.delete('/carros/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), CarroController.delete)

module.exports = routes
