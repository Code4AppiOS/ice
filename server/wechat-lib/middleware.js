// koa中间件
import sha1 from 'sha1'
import config from '../config'
import getRawBody from 'raw-body' // 拿到http请求数据包
import * as util from './util'

export default function (opts, reply) {
	return async function wechatMiddleWare(ctx, next){
		const token = config.wechat.token
		const {
			signature,
			timestamp,
			nonce,
			echostr
		} = ctx.query

		const str = [token, timestamp, nonce].sort().join('');
		const sha = sha1(str);

		if(ctx.method === 'GET') {
			if(sha === signature) {
				ctx.body = echostr;
			} else {
				ctx.body = 'failed!'
			}
		} else if(ctx.method === 'POST') {
			if(sha !== signature) {
				ctx.body = 'failed!'
				return false
			}
			const data = await getRawBody(ctx.req , {
				length: ctx.length,
				limit: '1mb',
				encoding: ctx.charset
			})
			const content = await util.parseXML(data)
			const message = util.formatMessage(content.xml)
			ctx.weixin = message
			// apply
			// apply:方法能劫持另外一个对象的方法，继承另外一个对象的属性.  

			// Function.apply(obj,args)方法能接收两个参数  
			// obj：这个对象将代替Function类里this对象  
			// args：这个是数组，它将作为参数传给Function（args-->arguments）  

			// call:和apply的意思一样,只不过是参数列表不一样.  

			// Function.call(obj,[param1[,param2[,…[,paramN]]]])  
			// obj：这个对象将代替Function类里this对象  
			// params：这个是一个参数列表  
			await reply.apply(ctx, [ctx, next])
			const replyBody = ctx.body
			const msg = ctx.weixin
			const xml = util.tpl(replyBody, msg)
			ctx.status = 200
			ctx.type = 'appliction/xml'
			ctx.body = xml
		}
	}
}