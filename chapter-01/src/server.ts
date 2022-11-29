import express from 'express'
import { v4 as uuidV4 } from 'uuid'

const app = express()
app.use(express.json())

const customers = []

app.post('/account', (request, response) => {
  const { name, cpf } = request.body

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  )

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists' })
  }

  const account = {
    id: uuidV4(),
    name,
    cpf,
    statement: [],
  }

  customers.push(account)

  return response.status(201).json(account)
})

app.listen(3333, () => console.log('listening on port 3333'))
