import { Category } from '../model/Category'

interface ICreateCategoryDTO {
  name: string
  description: string
}

class CategoriesRepository {
  private categories: Category[]
  constructor() {
    this.categories = []
  }
  create({ name, description }: ICreateCategoryDTO) {
    const category: Category = new Category()

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
    })

    this.categories.push(category)
  }
  findByName(name: string) {
    const categoryAlreadyExists = this.categories.find(
      (category) => category.name === name
    )
    return categoryAlreadyExists
  }
}

export { CategoriesRepository }
