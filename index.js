require('./mongoose')
const express = require('express')
const app = express()
const cors = require('cors')
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
const logger = require('./loggerMiddleware')
const usersRouter = require('./controllers/users')
const notFound = require('./middlewares/notFound')
const productsRouter = require('./controllers/products')
const handleErrors = require('./middlewares/handleErrors')

app.use(cors())
app.use(express.json())

app.use(logger)

Sentry.init({
  dsn: 'https://ad3664737e7148afbcb0749f2d47a4f5@o4504753410867200.ingest.sentry.io/4504753416568832',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app })
  ],
  tracesSampleRate: 1.0
})

app.use(Sentry.Handlers.requestHandler())

app.use(Sentry.Handlers.tracingHandler())

app.get('/', (request, response) => {
  response.status(200).send('<h1>Galipan Database</h1>')
})

app.use('/api/products', productsRouter)

app.use(Sentry.Handlers.errorHandler())

app.use('/api/users', usersRouter)

app.use(notFound)

app.use(handleErrors)
const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = { app, server }
