
const Koa = require('koa')

const app = new Koa()

// 路由
const index = require('./routes/index')

app.use(index.routes(), index.allowedMethods())

module.exports = app