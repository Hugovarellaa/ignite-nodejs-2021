export interface ICustomerDTO {
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
