var amqplib = require('amqplib/callback_api')
var shell = require('shelljs')
var fs= require('fs')

var queueName = 'wx_server'

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
            // docker run --name=test-room --volume="$(pwd)":/bot --rm zixia/wechaty room.js

            if (result.body.status == 2) {  // 启动
                if (result.body.listen_type == 1) {
                    // shell.exec('bash')
                    shell.exec(`nohup sudo docker run --name=wxserver_${result.body.id} --net=host --volume="/alidata/www/wechaty":/bot --rm zixia/wechaty index.js --admin=${result.body.wechat_name} --room=${result.body.room_name} --server=${result.body.id} &`, {async:true})
                    ch.ack(msg)
                } else if (result.body.status == '2'){
                    // 监听公众号

                } else {
                    ch.ack(msg)
                }
            } else { // 停止
                if (result.body.listen_type == 1) {
                    shell.exec(`nohup sudo docker stop wxserver_${result.body.id} &`)
                    ch.ack(msg)
                } else if (result.body.status == '2'){
                    // 监听公众号

                } else {
                    ch.ack(msg)
                }
            }
        }
    })
}

function bail(err) {
    console.error(err)
    process.exit(1)
}
