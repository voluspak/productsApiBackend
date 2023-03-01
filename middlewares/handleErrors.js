const ERROR_HANDLERS = {
  CastError: (res) => {
    res.status(404).send({ error: 'id is malformed' })
  },

  ValidationError: (res, error) => {
    res.status(409).send({ error: error.message })
  },

  JsonWebTokenError: (res) => {
    res.status(401).json({ error: 'token missing or invalid' })
  },

  TokenExpireError: (res) => {
    res.status(401).json({ error: 'token expired' })
  },

  defaultError: res => res.status(500).end()
}

module.exports = (error, request, response, next) => {
  console.error(error.name)
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response, error)
}
