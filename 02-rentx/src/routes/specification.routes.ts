import { Router } from 'express'

import { specificationController } from '../modules/cars/useCases/createSpecification'

const specificationsRoutes = Router()

specificationsRoutes.post('/', (request, response) => {
  specificationController.handle(request, response)
})

specificationsRoutes.get('/', (request, response) => {
  const specifications = specificationRepository.list()
  return response.status(200).json(specifications)
})

export { specificationsRoutes }
