const cors = require('koa2-cors')
const { corsOrigin } = require('../config')

module.exports = cors({
    origin: ctx => {
        if (corsOrigin === '*') return '*'
        // 线上环境
        const ref = ctx.header.referer || '' // 如 `https://www.imooc-logo.com/index.html`
        const originArr = corsOrigin.split(',').map(s => s.trim()) // 转为数组
        const originArrByRef = originArr.filter(s => ref.indexOf(s) === 0) // 和 ref 一致的域名
        if (originArrByRef.length > 0) return originArrByRef[0]

        // 其他情况
        return false
    },
    credentials: true , // 允许跨域带 cookie
})