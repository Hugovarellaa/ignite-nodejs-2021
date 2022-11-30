import { Router } from 'express'

import { Category } from '../model/Category'

const categoriesRoutes = Router()

const categories = []

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const category: Category = new Category()

  Object.assign(category, {
    name,
    description,
    createdAt: new Date(),
  })

  categories.push(category)

  return response.status(201).json(categories)
})

export { categoriesRoutes }
