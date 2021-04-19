const redis = require('redis')
const { redisConf } = require('../config/index')

const { port, host } = redisConf
const redisClient = redis.createClient(port, host)

redisClient.on('error', err => {
    console.error('redis connect error', err)
})

module.exports = redisClient