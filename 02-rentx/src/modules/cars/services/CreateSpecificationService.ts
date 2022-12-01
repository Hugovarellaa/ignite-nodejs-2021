import { SpecificationsRepository } from '../repositories/implementations/SpecificationsRepository'

interface IRequest {
  name: string
  description: string
}

class CreateSpecificationService {
  constructor(private specificationRepository: SpecificationsRepository) {}
  execute({ name, description }: IRequest): void {
    this.specificationRepository.create({ name, description })
  }
}

export { CreateSpecificationService }
