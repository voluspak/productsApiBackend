require('dotenv').config({ path: './.env' })
const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://itelleria96:IhSPHPjmPfA6Vbig@galipandatabase.z9bzpt8.mongodb.net/galipandb?retryWrites=true&w=majority'
console.log('conectado a productionDB')
mongoose.connect(connectionString)
  .then(() => console.log('Database connected bro!'))
  .catch(err => console.log('Oopsie!' + err))

console.log('the string is: ' + process.env.MONGO_DB_URI)
