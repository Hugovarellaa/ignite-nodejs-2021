import { Router } from 'express'

import { specificationController } from '../modules/cars/useCases/createSpecification'
import { listSpecificationController } from '../modules/cars/useCases/listSpecifications'

const specificationsRoutes = Router()

specificationsRoutes.post('/', (request, response) => {
  specificationController.handle(request, response)
})

specificationsRoutes.get('/', (request, response) => {
  listSpecificationController.handle(request, response)
})

export { specificationsRoutes }
