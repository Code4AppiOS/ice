import Router from 'koa-router'
import { controller, get, post } from '../decorator/router.js'

// 不同的路由对应不同的文件
@controller('/wiki')
export class wikiController {
	@get('/houses')
		async getHouses(ctx, next) {
			// 从mongo获取数据
			const houses = await WikiHouse
				.find({})
				.populate({
					path: '',
					select: ''
				})
				.exec()

			ctx.body = {
				houses,
				success: true
			}
	}

	@get('/houses/:_id')
	async getHou(ctx, next) {
		const { params } = ctx
		const { _id } = params
		
 	}
}