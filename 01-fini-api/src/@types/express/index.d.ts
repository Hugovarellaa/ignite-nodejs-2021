/* eslint-disable @typescript-eslint/naming-convention */

declare namespace Express {
    interface Request {
        customer: {
            id: string
            name: string
            cpf: string
            statement: string[]
        }
    }
}
