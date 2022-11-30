/* eslint-disable @typescript-eslint/naming-convention */

declare namespace Express {
    interface Request {
        customer: {
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
    }
}
