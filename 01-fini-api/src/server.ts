import express from 'express'
import { v4 as uuidV4 } from 'uuid'

const app = express()
app.use(express.json())

type Account = {
    id: string
    name: string
    cpf: string
    statement: string[]
}

const customers = []

app.post('/account', (request, response) => {
    const { name, cpf } = request.body

    const accountAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    )

    if (accountAlreadyExists) {
        return response.status(400).json({ message: 'Account already exists' })
    }

    const account: Account = {
        id: uuidV4(),
        name,
        cpf,
        statement: []
    }

    customers.push(account)
    return response.status(201).json(account)
})

app.listen(3333, () => console.log('Listening on port 3333'))
