import { Request, Response } from 'express'

class ListCategoriesController {
  handle(request: Request, response: Response) {
    const all = categoriesRepository.list()

    return response.json(all)
  }
}

export { ListCategoriesController }
