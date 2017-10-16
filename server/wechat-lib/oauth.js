import request from 'request-promise'

const base = 'https://api.weixin.qq.com/sns/'
const api = {
	authorize: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
	access_token: base + 'oauth2/access_token?'	,
	userInfo: base + 'userinfo?'
}

export default class WechatOAuth {
	constructor(opts) {
		this.opts = Object.assign({}, opts)
 
		this.appID = opts.appID
		this.appSecret = opts.appSecret
	}

	// 统一管理面对微信的异步函数
	async request (options) {
		options = Object.assign({}, options, {json:  true})
		try {
			const response = await request(options)
			return response
		} catch(error) {
			console.log(error)
		}
		return response
	}

	// 获取微信授权 code 拼接 等待调用
	getAuthorizeURL(scope = 'snsapi_base', target, state) {
		console.log(target)
		const url = `${api.authorize}appid=${this.appID}&redirect_uri=${encodeURIComponent(target)}&response_type=code&scope=${scope}&state=1#wechat_redirect`
		return url
	}

	// 根据 code 获取授权的 access_token
	async fetchAccessToken (code) {
		const url = `${api.access_token}appid=${this.appID}&secret=${this.appSecret}&code=${code}&grant_type=authorization_code`
		const data = await this.request({url: url})
		return data
	}

	// 获取用户信息
	async getUserInfo(token, openID, lang='zh_CN') {
		const url = `${api.userInfo}access_token=${token}&openid=${openID}&lang=${lang}`
		const data = await this.request({url: url})
		return data
	}
}