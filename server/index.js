const express = require('express')
const app = express()
const cors = require('cors')


app.use(express.json())
app.use(cors())


const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT
require('./model')





// Routes import

// app.use('api/',require('./router/comment.router'))









app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
