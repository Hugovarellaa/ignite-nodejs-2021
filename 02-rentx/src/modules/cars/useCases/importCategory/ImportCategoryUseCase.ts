import { parse } from 'csv-parse'
import fs from 'fs'

import { ICategoriesRepository } from '../../repositories/ICatgoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategory(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path)
      const csvParse = parse()

      const categories: IImportCategory[] = []

      stream.pipe(csvParse)

      csvParse
        .on('data', async (row) => {
          const [name, description] = row
          categories.push({ name, description })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategory(file)

    categories.map(async (category) => {
      const { name, description } = category

      const categoryExists = this.categoriesRepository.findByName(name)
      if (!categoryExists) {
        this.categoriesRepository.create({
          name,
          description,
        })
      }
    })
  }
}

export { ImportCategoryUseCase }
