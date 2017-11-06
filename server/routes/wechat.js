import Router from 'koa-router'
import { controller, get, post } from '../decorator/router.js'
import config from '../config'
import { resolve } from 'path'
import reply from '../wechat/reply'
import wechatMiddleWare from '../wechat-lib/middleware.js'
import {signature,redirect,oauth} from '../controllers/wechat'

// 不同的路由对应不同的文件
@controller('')
export class WechatController {
	@get('/wechat-hear')
	async wechatHear(ctx, next) {
		const middle = wechatMiddleWare(config.wechat, reply)
		const body = await middle(ctx, next)

		ctx.body = body
	}

	@post('/wechat-hear')
		async wechatPostHear(ctx, next) {
		const middle = wechatMiddle(config.wechat, reply)
		const body = await middle(ctx, next)

		ctx.body = body
	}

	@get('/wechat-signature')
	async wechatSignature(ctx, next) {
		await signature(ctx, next)
	}

	@get('/wechat-redirect')
	async wechatRedirect(ctx, next) {
		await redirect(ctx, next)
	}

	@get('/wechat-oauth')
	async wechatOauth(ctx, next) {
		await oauth(ctx, next)
	}
}

// export const router = app => {
// 	const router = new Router()
// 	router.all('/wechat-hear', wechatMiddleWare(config, reply))

// 	router.get('/upload', (ctx, next) => {
// 		let mp = require('../wechat')
// 		let client = mp.getWechat()

// 		client.handle('uploadMaterial','image', resolve(__dirname,'../../ice.jpeg'), {type:'image'})
// 	})

// 	router.get('/wechat-signature',signature)
	
// 	router.get('/wechat-redirect', redirect)
// 	router.get('/wechat-oauth', oauth)


// 	app.use(router.routes());
// 	app.use(router.allowedMethods());
// }