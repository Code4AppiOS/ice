import mongoose from 'mongoose'
import config from '../config'
import { resolve } from 'path'
import fs from 'fs'

// 读入schema文件
const models = resolve(__dirname, '../database/schema')
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*js$/))
  .forEach(file => require(resolve(models, file)))

let heros = require(resolve(__dirname, '../../crawler/herolist.json'))

export const database = app => {

	mongoose.set('debug', true)

	mongoose.connect(config.db)

	mongoose.connection.on('disconnected', () => {
		mongoose.connect(config.db)
	})

	mongoose.connection.on('error', err => {
		console.log(err)
	})

	mongoose.connection.on('open', async => {
		console.log('connected to mongoDB', config.db)

		const Heros = mongoose.model('Heros')
		const existheros = await Heros.find({}).exec()

		if(!existheros.length) Heros.insertMany(heros)  // 同时插入多条数据 
	})
}