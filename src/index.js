const http = require('http')
const { ENV } = require('./utils/env')
const { WorkContentModel } = require('./models/WorkContentModel')
const { cacheGet, cacheSet } = require('./cache/index')
const syncDb = require('../src/db/seq/utils/sync-alter')
const testMysqlConn = require('./db/mysql2')
const packageInfo = require('./../package.json')

const server = http.createServer(async (req, res) => {

    // 同步数据表
    const seq = await syncDb()

    // 测试 mongodb 连接
    let mongodbConn
    try {
        mongodbConn = true
        await WorkContentModel.findOne()
    } catch (ex) {
        mongodbConn = false
    }

    // 测试 redis 连接
    cacheSet('name', 'lego web sever OK - by redis')
    const redisTestVal = await cacheGet('name')
    // 测试 mysql 连接
    const mysqlRes = await testMysqlConn()
    
    res.end(JSON.stringify({
        name: 'lego web sever',
        version: packageInfo.version,
        ENV,
        redisConn: redisTestVal != null,
        mysqlConn: mysqlRes.length > 0,
        mongodbConn,
    }))
})

server.listen(8080, () => {
    console.log('port run on 8080')
})