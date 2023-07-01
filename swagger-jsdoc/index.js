const express = require('express')
const swaggerUi = require('swagger-ui-express')
const path = require('path')
const swaggerJsdoc = require('swagger-jsdoc')
const yaml = require('yamljs')

const router = require('./router')
const schemasPath = path.resolve(__dirname, 'schemas.yml')
const schemas = yaml.load(schemasPath)
const swaggerDocument = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'TMS course example swagger docs.',
      description: 'WE wanna show some swagger examples.'
    }
  },
  apis: [path.resolve(__dirname, 'router/routes/*.route.js')],
  schemas
})

const app = express()
const port = parseInt(process.env.PORT) || 3000

app
  .use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(express.json())
  .use(router)
  .use((err, req, res, next) => {
    if (err) {
      console.error(err)
    }
  })
  .listen(port, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Swagger started on ${port}`)
    }
  })
