const express = require('express')

const errorHandler = require('./errors/errorHandler')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(errorHandler)

app.use(routes)

app.listen(3334, () => {
  console.log('Server started on port 3334!')
})
