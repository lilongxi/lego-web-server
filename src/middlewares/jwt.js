const jwtKoa = require('koa-jwt')
const { JWT_SECRET, JWT_IGNORE_PATH } = require('../config/constant')

module.exports = jwtKoa({
    secret: JWT_SECRET,
    cookie: 'jwt_token', // 使用 cookie 存储 token
}).unless({
    path: JWT_IGNORE_PATH // 定义哪些路由忽略 jwt 验证
})