const express = require('express')

const errorHandler = require('./errors/errorHandler')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(errorHandler)

app.use(routes)

const port = process.env.PORT || 3334

app.listen(port, () => {
  console.log(`Server started on port ${port}!`)
})
