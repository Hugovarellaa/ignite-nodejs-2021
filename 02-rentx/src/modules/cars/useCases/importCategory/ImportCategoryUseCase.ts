import { parse } from 'csv-parse'
import fs from 'fs'

import { ICategoriesRepository } from '../../repositories/ICatgoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadcategory(file: Express.Multer.File) {
    const stream = fs.createReadStream(file.path)
    const csvParse = parse()

    const categories: IImportCategory[] = []

    stream.pipe(csvParse)

    csvParse.on('data', async (row) => {
      const [name, description] = row
      categories.push({ name, description })
    })
    return categories
  }

  execute(file: Express.Multer.File) {
    const categories = this.loadcategory(file)
    console.log(categories)
  }
}

export { ImportCategoryUseCase }
