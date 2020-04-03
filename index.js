
require('dotenv').config()
require(process.env.ROOT + 'logger.js').initializeLogger();
require(process.env.ROOT + 'db/dbUtils').loadDB();
const PORT = process.env.PORT
const HOST = process.env.HOST
const app = require('./app')

app.listen(PORT,HOST,() => console.log(`app runing on port ${PORT}`))
