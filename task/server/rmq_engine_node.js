var amqplib = require('amqplib/callback_api')
var shell = require('shelljs')
var fs= require('fs')

var queueName = 'engine_node'

amqplib.connect('amqp://jinse_admin:jinse-admin-e59cc9ba614a9b92018@172.17.59.159:5672/crawl', function(err, conn) {
// amqplib.connect('amqp://admin:admin@127.0.0.1:5672/crawl', function(err, conn) {
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
                if (shell.exec('sudo docker exec -i 471b73abcc3a /alidata/server/node/bin/node ' + path + ' ' + result.body.task_run_log_id + ' "' + result.body.url + '"', {async:true}).code !== 0) {
                // if (shell.exec('node ' + path + ' ' + result.body.task_run_log_id + ' "' + result.body.url + '"').code !== 0) {
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
