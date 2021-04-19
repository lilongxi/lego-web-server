const path = require('path')
const simpleGit = require('simple-git')
const requireAll = require('require-all')
const seq = require('../seq')
const { isDev } = require('../../../utils/env')

// 获取所有 seq model
requireAll({
    dirname: path.resolve('src', 'models'), // src/models 中可能会有 mongoose 的 model ，不过这里获取了也没关系
    filter: /\.js$/,
    excludeDirs: /^\.(git|svn)$/,
    recursive: true, // 递归
})

async function syncDb() {
    let needToSyncDb = true
    if (isDev) {
        // 开发环境下，修改频繁，每次重启都同步数据表，消耗太大
        // 所以，开发环境下，判断是否修改了 src/models 中的内容？
        // 如果是，则同步数据表。否则，不用同步数据表。
        const git = simpleGit()
        // 获取 git status 修改的文件，modified 格式如  [ '.gitignore', 'package.json', 'src/models/README.md' ]
        const { modified, not_added: nodeAdded, created, deleted, renamed } = await git.status()
        const fileChanged = modified
            .concat(nodeAdded)
            .concat(created)
            .concat(deleted)
            .concat(renamed)
        // 到此，说明 git status 有改动
        if (fileChanged.length) {
             // 是否改动了 db 相关的文件
             const changedDbFiles = fileChanged.some(f => {
                // 改动了 src/models ，需要同步数据库
                if (f.indexOf('src/models/') === 0) return true
                // 改动了 src/db/seq ，需要同步数据库
                if (f.indexOf('src/db/seq/') === 0) return true
                // 其他情况，不同步
                return false
            })
             // 没改动 db 文件，则不需要同步
             if (!changedDbFiles) needToSyncDb = false
             // 如果 git status 没有改动，则照常同步数据表，重要！！！
        }
    }
    if (needToSyncDb) {
        await seq.sync({ alter: true })
    }
}

module.exports = syncDb