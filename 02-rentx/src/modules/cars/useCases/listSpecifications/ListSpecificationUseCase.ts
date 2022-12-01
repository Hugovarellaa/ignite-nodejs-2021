import { Specification } from '../../model/Specification'
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository'

class ListSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}
  execute(): Specification[] {
    const allSpecifications = this.specificationsRepository.list()
    return allSpecifications
  }
}

export { ListSpecificationUseCase }
