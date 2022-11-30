import { Router } from 'express'

import { CategoriesRepository } from '../repositories/CategoriesRepository'

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body

  categoriesRepository.create({ name, description })
  // const categoryAlreadyExists = categories.find(
  //   (category) => category.name === name
  // )

  // if (categoryAlreadyExists) {
  //   return response.status(400).json({ message: 'Category already exists' })
  // }

  return response.status(201).send()
})

export { categoriesRoutes }
