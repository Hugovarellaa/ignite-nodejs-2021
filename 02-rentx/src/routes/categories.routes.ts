import { Router } from 'express'

import { createCategoryController } from '../modules/cars/useCases/createCategory'

const categoriesRoutes = Router()

categoriesRoutes.post('/', (request, response) => {
  createCategoryController.handle(request, response)
})

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list()

  return response.json(all)
})
export { categoriesRoutes }
