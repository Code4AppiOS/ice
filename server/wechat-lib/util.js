import xml2js from 'xml2js'
import template from './tpl'
import sha1 from 'sha1'

function parseXML(xml) {
	return new Promise((resolve, reject) => {
		xml2js.parseString(xml, {trim : true}, (err, content) => {
			if(err) reject(err)
				else resolve(content)
			})
	})
}

function formatMessage(result) {
	let message = {}
	if(typeof result === 'object') {
		const keys = Object.keys(result)
		for(let i = 0; i < keys.length; i++){
			let item = result[keys[i]]
			let key = keys[i]
			if(!(item instanceof Array) || item.length === 0) {
				continue
			}
			// break 语句用于跳出循环。
			// continue 用于跳过循环中的一个迭代。
			if(item.length === 1) {
				let val = item[0]

				if(typeof val === 'object') {
					message[key] = formatMessage(val)
				} else {
					message[key] = (val || '').trim()
				} 
			} else {
				message[key] = []
				for(let j = 0; j < item.length; j++) {
					message[key].push(formatMessage(item[j]))
				}
			}
		} 
	}
	return message
}

function tpl (content, message) {
	let type = 'text'
	if(Array.isArray(content)){
		type = 'news'
	}
	if(!content) {
		content = 'Empty News'
	}
	if(content && content.type) {
		type = content.type
	}
	let info = Object.assign({},{
		content: content,
		createTime: new Date().getTime(),
		msgType: type,
		toUserName: message.FromUserName,
		fromUserName: message.toUserName
	})
	return template(info)

}

// 随机字符串
function createNonce() {
	return Math.random().toString(36).substr(2,15)
}

// 时间戳
function createTimestamp() {
	return parseInt(new Date().getTime() / 1000, 0) + ''
}

//https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115 附录1
function raw(args) {
	let keys = Object.keys(args) // 取出对象中的key
	let newArgs = {}
	let str = ''
	keys = keys.sort()
	keys.forEach(key => {
		newArgs[key.toLowerCase()] = args[key]
	})

	for(let k in newArgs) {
		str += '&' + k + '=' + newArgs[k]
	}

	return str.substr(1)
}

function signIt(nonce, ticket, timestamp, url) {
	const ret = {
		jsapi_ticket: ticket,
		noncestr: nonce,
		timestamp: timestamp,
		url: url
	}

	const string = raw(ret)
	const sha = sha1(string)
	return sha
}

function sign(ticket, url) {
	const nonce = createNonce()
	const timestamp = createTimestamp()
	const signature = signIt(nonce, ticket, timestamp, url)
	return {
		noncestr: nonce,
		timestamp: timestamp,
		signature: signature
	}
}

export {
	parseXML,
	formatMessage,
	tpl,
	sign
}