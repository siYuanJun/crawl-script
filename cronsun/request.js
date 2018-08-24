var request = require('request-promise')
var shell = require('shelljs')
var config = require('../public/config')

var arguments = process.argv.splice(2);
var driver = arguments[0]
var cron = arguments[1]
var env = config.env
var nodePath = ''
var casperjsPath = ''
if (env == 'dev') {
    casperjsPath = config.dev.casperjsPath 
    nodePath = config.dev.nodePath
} else {
    casperjsPath = config.pro.casperjsScope
    nodePath = config.pro.nodeScope
}
if (driver == undefined || cron == undefined) {
    console.log('driver or cron 必填，eg: node request.js {driver} {cron}')
    process.exit()
}
// 发起请求
console.log(`请求 URL ：${config.jinse_api_url}/v1/script/queue?driver=${driver}&cron=${cron}`)
request(`${config.jinse_api_url}/v1/script/queue?driver=${driver}&cron=${cron}`)
    .then(function (repos) {
        var res = JSON.parse(repos)
        if (res.status_code != 200) {
            console.log('接口错误')
            process.exit()
        }
        var data = res.data
        if (data.length < 1) {
            console.log('暂时没有任务要处理，稍后重试')
            process.exit()
        }
        data.forEach(function(value){
            // node example.js task_run_log_id task_id
            if (driver == 'node') {
                shell.exec(`${nodePath} /alidata/www/crawl/task/publish/${value.path} ${value.task_run_log_id}`, {async:true})
            } else if (driver == 'casper') {
                shell.exec(`${casperjsPath} /alidata/www/crawl/task/publish/${value.path} ${value.task_run_log_id} --web-security=no`, {async:true})
            } else {
                console.log(`暂不支持 driver = ${driver} 类型的脚本`)
                process.exit()
            }
        })
        if (driver == 'node') {
            setInterval(function(){
                process.exit()
            }, 5500)
        }
    })
    .catch(function (err) {
        console.log(err)
    });
