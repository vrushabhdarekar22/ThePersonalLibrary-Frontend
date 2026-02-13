import { Book } from './book'

export interface PaginatedBooks {
  data: Book[]
  total: number
  page: number
  totalPages: number
}
