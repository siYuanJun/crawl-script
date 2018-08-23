var amqplib = require('amqplib/callback_api')
var shell = require('shelljs')
var fs= require('fs')
var config = require('../../public/config')

var queueName = 'test_engine_node'

var env = config.env
var amqplibUrl = ''
var casperjsUrl = ''
if (env == 'dev') {
    amqplibUrl = config.dev.amqplibUrl
    nodePath = config.dev.nodePath
} else {
    amqplibUrl = config.pro.amqplibUrl
    nodePath = config.pro.nodePath
}

 amqplib.connect(amqplibUrl, function(err, conn) {
    if (err != null) bail(err)

    conn.createChannel(newTask)
})

function newTask(err, ch) {
    if (err != null) bail(err)

    ch.assertQueue(queueName)
    ch.consume(queueName, function(msg) {

        if (msg !== null) {
            console.log(msg.content.toString())
            var result = JSON.parse(msg.content.toString())
            // 判读脚本是否存在
            var path = '/alidata/www/crawl/task/publish/' + result.body.path
            console.log(path)
            var scriptExists = fs.existsSync(path)
            if (scriptExists) {
                console.log("脚本存在")

                // 执行脚本
                 if (shell.exec(nodePath + ' ' + path + ' ' + ' "' + result.body.task_run_log_id + '"' + ' "' + result.body.url + '"').code !== 0) {
                    shell.echo('脚本执行 Fail:')
                    ch.ack(msg)
                } else {
                    shell.echo('脚本执行 Success')
                    ch.ack(msg)
                }
            } else {
                console.log("脚本不存在")
                ch.ack(msg)
            }

        }
    })
}

function bail(err) {
    console.error(err)
    process.exit(1)
}
