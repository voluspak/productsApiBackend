const DB_KEY = 'IhSPHPjmPfA6Vbig'
const mongoose = require('mongoose')

const productionDB = `mongodb+srv://itelleria96:${DB_KEY}@galipandatabase.z9bzpt8.mongodb.net/galipandb?retryWrites=true&w=majority`
const testingDB = `mongodb+srv://itelleria96:${DB_KEY}@galipandatabase.z9bzpt8.mongodb.net/galipandb-test?retryWrites=true&w=majority`

const connectionString = process.env.NODE_ENV === 'test'
  ? testingDB
  : productionDB
console.log(connectionString === testingDB ? 'Conectado a testingDB' : 'conectado a productionDB')
mongoose.connect(connectionString)
  .then(() => console.log('Database connected bro!'))
  .catch(err => console.log('Oopsie!' + err))
