require('dotenv').config({ path: './.env' })
const mongoose = require('mongoose')

const connectionString = process.env.NODE_ENV === 'test'
  ? process.env.MONGO_DB_URI_TEST
  : process.env.MONGO_DB_URI
console.log(connectionString === process.env.MONGO_DB_URI_TEST ? 'Conectado a testingDB' : 'conectado a productionDB')
mongoose.connect(connectionString)
  .then(() => console.log('Database connected bro!'))
  .catch(err => console.log('Oopsie!' + err))
