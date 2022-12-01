import { Router } from 'express'

import { CategoriesRepository } from '../repositories/implementations/CategoriesRepository'
import { CreateCategoryService } from '../services/CreateCategoryService'

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()
const createCategoryService = new CreateCategoryService(categoriesRepository)

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body
  createCategoryService.execute({ name, description })
  return response.status(201).send()
})

categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list()

  return response.json(all)
})
export { categoriesRoutes }
