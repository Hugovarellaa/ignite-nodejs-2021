import { Category } from '../model/Category'

class CategoriesRepository {
  private categories: Category[]
  constructor() {
    this.categories = []
  }
}

export { CategoriesRepository }
