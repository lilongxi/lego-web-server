const devConf = require('./dev')

Object.assign(devConf.redisConf, {
    host: 'lego-web-redis' // container_name: lego-web-redis
})

Object.assign(devConf.mysqlConf, {
    host: 'lego-web-mysql'
})

Object.assign(devConf.mongodbConf, {
    host: 'lego-web-mongo'
})

module.exports = devConf