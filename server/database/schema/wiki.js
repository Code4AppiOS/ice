// 存储全局票据token,schema可以看作是一张表，model对schema进行数据库操作
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const HerosSchema = new mongoose.Schema({
	cname: Number,
	ename: String,
	title: String,
	pay_type: Number,
	new_type: Number,
	hero_type: Number,
	skin_name: String,		
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
HerosSchema.pre('save', function (next) {
	if(this.isNew) {
		this.meta.createdAt = this.meta.updateAt = Date.now()
	} else {
		this.meta.updateAt = Date.now()
	}

	next();
})
}

const Heros = mongoose.model('Heros', HerosSchema)
