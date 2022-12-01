import { Category } from '../model/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICreateCategoriesRepository {
  findByName(name: string): Category
  list(): Category[]
  create({ name, description }: ICreateCategoryDTO): void
}

export { ICreateCategoriesRepository, ICreateCategoryDTO }
