const express = require('express')

const app = express()

app.get('/', (request, response) => response.json({ message: 'hello world' }))

app.listen(3333, () => {
  console.log('Server started on port 3333!')
})
