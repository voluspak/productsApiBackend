const DB_KEY = 'IhSPHPjmPfA6Vbig'
const mongoose = require('mongoose')

const connectionString = `mongodb+srv://itelleria96:${DB_KEY}@galipandatabase.z9bzpt8.mongodb.net/galipandb?retryWrites=true&w=majority`

mongoose.connect(connectionString)
  .then(() => console.log('Database connected bro!'))
  .catch(err => console.log('Oopsie!' + err))
