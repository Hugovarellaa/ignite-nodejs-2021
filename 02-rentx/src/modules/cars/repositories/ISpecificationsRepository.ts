import { Specification } from '../model/Specification'

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void
  findByName(name: string): Specification
  list(name: string): Specification[]
}

export { ISpecificationsRepository, ICreateSpecificationDTO }
