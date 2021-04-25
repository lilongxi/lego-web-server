
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const helmet = require('koa-helmet')
const cors = require('./middlewares/cors')
const jwt = require('./middlewares/jwt')
const { isTest } = require('./utils/env')
const { onerror, onNotFound } = require('./middlewares/error')
const app = new Koa()

// 路由
const index = require('./routes/index')

// 安装预防，设置必要的 http 头
app.use(helmet())

// onerror(app) // 不好用，自己写一个中间
app.use(onerror)

// 支持跨域
app.use(cors)

// 配置 jwt
app.use(jwt);

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)

if (!isTest) app.use(logger())

app.use(index.routes(), index.allowedMethods())

module.exports = app