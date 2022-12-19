export interface IProduct {
  id: string
  name: string | undefined
  price: number | undefined
  quantity: number | undefined
  created_at?: Date
  updated_at?: Date
}
