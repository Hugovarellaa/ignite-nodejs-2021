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

interface ICustomerDTO {
    id: string
    name: string
    cpf: string
    statement: {
        description: string
        amount: number
        created_at: Date
        type: 'debit' | 'credit'
    }[]
}

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

function getBalancer(customer: ICustomerDTO) {
    const balance = customer.statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount
        }
        return acc - operation.amount
    }, 0)
    return balance
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

app.post('/withdraw', verifyExistsAccountCpf, (request, response) => {
    const { customer } = request
    const { description, amount } = request.body

    const balance = getBalancer(customer)

    if (amount > balance) {
        return response.status(400).json({ message: 'insufficient funds!' })
    }

    customer.statement.push({
        description,
        amount,
        created_at: new Date(),
        type: 'debit'
    })

    return response.json(customer.statement)
})

app.get('/statement/date', verifyExistsAccountCpf, (request, response) => {
    const { date } = request.query
    const { customer } = request

    const dateFormatted = new Date(`${date} 00:00`)

    const statement = customer.statement.filter(
        (statement) =>
            statement.created_at.toDateString() ===
            new Date(dateFormatted).toDateString()
    )

    console.log(dateFormatted)
    console.log(statement)

    return response.json(statement)
})

app.put('/account', verifyExistsAccountCpf, (request, response) => {
    const { customer } = request
    const { name } = request.body

    customer.name = name

    return response.send()
})

app.get('/account', verifyExistsAccountCpf, (request, response) => {
    const { customer } = request

    return response.json(customer)
})

app.delete('/account', verifyExistsAccountCpf, (request, response) => {
    const { customer } = request

    customers.splice(Number(customer), 1)

    return response.json(customer)
})

app.listen(3333, () => console.log('Listening on port 3333'))
