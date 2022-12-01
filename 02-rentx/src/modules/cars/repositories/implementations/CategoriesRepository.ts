import { Category } from '../../model/Category'
import {
  ICreateCategoriesRepository,
  ICreateCategoryDTO,
} from '../ICatgoriesRepository'

class CategoriesRepository implements ICreateCategoriesRepository {
  private categories: Category[]
  constructor() {
    this.categories = []
  }
  create({ name, description }: ICreateCategoryDTO) {
    const category: Category = new Category()

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string) {
    const categoryAlreadyExists = this.categories.find(
      (category) => category.name === name
    )
    return categoryAlreadyExists
  }
}

export { CategoriesRepository }
