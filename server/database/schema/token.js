// 存储全局票据token,schema可以看作是一张表，model对schema进行数据库操作
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new mongoose.Schema({
	name: String,
	token_Value: String, // token值
	expires_in: Number,
	meta: {
		createdAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

// schema 中间件，串行使用pre方法，执行下一个方法使用next调用
TokenSchema.pre('save', function (next) {
	if(this.isNew) {
		this.meta.createdAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	next();
})

TokenSchema.statics = {
	async getAccessToken() {
		const token = await this.findOne({
			name: 'access_token'
		}).exec()
		
		if(token && token.token) {
			token.access_token = token.token
		}
		return token
	},

	async saveAccessToken(data) {
		let token = await this.findOne({
			name: 'access_token'
		}).exec()

		if(token) {
			token.token = data.access_token
			token.expires_in = data.expires_in
		} else {
			token = new Token({
				name: 'access_token',
				token:  data.access_token,
				expires_in: data.expires_in
			})
		}

		await token.save()
		return data
	}	
}

const Token = mongoose.model('Token', TokenSchema)
