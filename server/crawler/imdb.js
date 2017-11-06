// import cheerio from 'cheerio'
// import rp from 'request-promise'
import { resolve } from 'path'
var fs = require('fs')
var request = require("request")
var mkdir = require('mkdirp')
const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export const getIMDBCharacters = async () => {
	const options = {
		uri: 'http://pvp.qq.com/web201605/herolist.shtml',
		transform: body => cheerio.load(body)
	}

	const $ = await rp(options)
	$('.herolist-content ul.herolist, li').each(function() {
		console.log($(this))
	})
}

export const getProfile = async () => {
	const heros = require(resolve(__dirname, './herolist.json'))libs

	var dir = './images'; // 项目根目录
	mkdir(dir, function(err) {
	if(err) {
	    console.log(err);
	}
	});

	heros.forEach(async (item) => {
		var ename = item.ename
		const uri = `http://game.gtimg.cn/images/yxzj/img201606/heroimg/${ename}/${ename}.jpg`
		
		// 将图片地址直接写入到json文件
		request(uri, async (err, respone, body) => {
			download(uri, dir, ename)
			await sleep(500)
			console.log('download complete')
		})
	})

	var download = async (uri, dir, fileName) => {
		request.head(uri, function(err, res, body) {
			request(uri).pipe(fs.createWriteStream(dir + "/" + fileName + ".jpg"))
		})
	}
}

getProfile()