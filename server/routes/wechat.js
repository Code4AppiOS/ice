import Router from 'koa-router'
import config from '../config'
import { resolve } from 'path'
import reply from '../wechat/reply'
import wechatMiddleWare from '../wechat-lib/middleware.js'
import {signature,redirect,oauth} from '../controllers/wechat'

export const router = app => {
	const router = new Router()
	router.all('/wechat-hear', wechatMiddleWare(config, reply))

	router.get('/upload', (ctx, next) => {
		let mp = require('../wechat')
		let client = mp.getWechat()

		client.handle('uploadMaterial','image', resolve(__dirname,'../../ice.jpeg'), {type:'image'})
	})

	router.get('/wechat-signature',signature)
	
	router.get('/wechat-redirect', redirect)
	router.get('/wechat-oauth', oauth)


	app.use(router.routes());
	app.use(router.allowedMethods());
}