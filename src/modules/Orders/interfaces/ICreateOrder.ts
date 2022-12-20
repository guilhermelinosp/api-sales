interface IProduct {
	id: string
	quantity: number
}

export interface ICreateOrder {
	customer_id: string
	products: IProduct[]
}
