import { Router } from 'express'

import { Category } from '../model/Category'

const categoriesRoutes = Router()

const categories = []

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  const category: Category = new Category()

  const categoryAlreadyExists = categories.find(
    (category) => category.name === name
  )

  if (categoryAlreadyExists) {
    return response.status(400).json({ message: 'Category already exists' })
  }

  Object.assign(category, {
    name,
    description,
    createdAt: new Date(),
  })

  categories.push(category)

  return response.status(201).json(categories)
})

export { categoriesRoutes }
