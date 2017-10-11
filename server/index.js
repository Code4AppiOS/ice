import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'

// 函数式风格，数据不变性和函数无副作用是它的核心设计理念，结合它的函数自动柯里化可以让多个函数的排
// 列和数据的变换传递变得更容易
import { resolve } from 'path'
import R from 'ramda'

const MIDDLEWARE = ['database','router']
const r = path => resolve(__dirname, path) // 当前目录下的路径

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 4003

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

const useMiddleWares = (app) => {
    // 中间件的个数不定，通过 Ramda 的特性，从右往左进行函数组合，右侧函数的返回结果总是左侧函数的输入参数
    // R.map(console.log)([1, 2, 3])
    // MIDDLEWARE 数组交给了 R.map
    // 分别拿到的单个数组中的值，我们可以通过 R.compose 再次进行组合。
    return R.map(R.compose(
        R.map(i => i(app)), // 把app传进去，初始化中间件中的每一个函数
        require, // 引入
        i => `${r('./middleWares/')}/${i}`))
    // 这种方法并不好用。感觉很难驾驭，如果出错，报错都在内部吃掉了。
}

// Instantiate nuxt.js
const nuxt = new Nuxt(config)

// Build in development
if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build().catch(e => {
        console.error(e) // eslint-disable-line no-console
        process.exit(1)
    })
}

useMiddleWares(app)(MIDDLEWARE)

app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        nuxt.render(ctx.req, ctx.res, promise => {
            // nuxt.render passes a rejected promise into callback on error.
            promise.then(resolve).catch(reject)
        })
    })
})

app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

