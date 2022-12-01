import { Category } from '../../model/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICatgoriesRepository'

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]
  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }
    return CategoriesRepository.INSTANCE
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
