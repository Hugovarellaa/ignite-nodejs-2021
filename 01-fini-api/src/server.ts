import express from 'express'
import { v4 as uuidV4 } from 'uuid'

const app = express()
app.use(express.json())

type Account = {
    id: string
    name: string
    cpf: string
    statement: string[]
}[]

const customers: Account = []

// Middleware
function verifyExistsAccountCpf(request, response, next) {
    const { cpf } = request.headers

    const customer = customers.find((customer) => customer.cpf === cpf)
    if (!customer) {
        return response.status(400).send({ message: 'Customer not found' })
    }

    request.customer = customer

    return next()
}

app.post('/account', (request, response) => {
    const { name, cpf } = request.body

    const accountAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    )

    if (accountAlreadyExists) {
        return response.status(400).json({ message: 'Account already exists' })
    }

    const account = {
        id: uuidV4(),
        name,
        cpf,
        statement: []
    }

    customers.push(account)
    return response.status(201).json(account)
})

app.get('/statement', verifyExistsAccountCpf, (request, response) => {
    const { customer } = request

    return response.json(customer.statement)
})

app.post('/deposit', verifyExistsAccountCpf, (request, response) => {
    const { customer } = request
    const { description, amount } = request.body

    customer.statement.push({
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    })

    return response
        .status(201)
        .send({ message: 'Account deposit was a success' })
})

app.listen(3333, () => console.log('Listening on port 3333'))
