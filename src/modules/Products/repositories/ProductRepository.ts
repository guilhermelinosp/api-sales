import { In } from 'typeorm'
import { dataSource } from '../../../shared/database'
import { Products } from '../../../shared/database/entities/Products'

export interface IFindAllByIds {
	id: string
}

export interface IUpdateStockProduct {
	id: string
	quantity: number
}

export const ProductRepository = dataSource.getRepository(Products).extend({
	async findById(id: string): Promise<Products | null> {
		const product = await this.findOneBy({ id })
		return product
	},

	async findAllByIds(products: IFindAllByIds[]): Promise<Products[] | null> {
		const productIds = products.map((product) => product.id)

		const productIdsCheck = await this.find({ where: { id: In(productIds) } })

		return productIdsCheck
	},

	async findByName(name: string): Promise<Products | null> {
		const product = await this.findOneBy({ name })
		return product
	},

	async updateStock(products: IUpdateStockProduct[]): Promise<void> {
		await this.save(products)
	}
})
