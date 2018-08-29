var amqplib = require('amqplib/callback_api')
var shell = require('shelljs')
var fs= require('fs')
const superagent = require('superagent')
var config = require('../../public/config')
var dateTime = require('date-time')
var startOn = dateTime()
var queueName = 'test_engine_node'

var env = config.env
var amqplibUrl = ''
var nodePath = ''
var postErrorUrl = ''

if (env == 'dev') {
    amqplibUrl = config.dev.amqplibUrl
    nodePath = config.dev.nodePath
    postErrorUrl = config.dev.post_result_url
} else {
    amqplibUrl = config.pro.amqplibUrl
    nodePath = config.pro.nodePath
    postErrorUrl = config.dev.post_result_url
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
                shell.exec(nodePath + ' ' + path + ' ' + ' "' + result.body.task_run_log_id + '"' + ' "' + result.body.url + '"', function(code, stdout, stderr) {
                    if (code !== 0) {
                        shell.echo('脚本执行 Fail:' + stderr)
                        postError(stderr, result.body.task_run_log_id)
                        ch.ack(msg)
                    } else {
                        shell.echo('脚本执行 Success')
                        ch.ack(msg)
                    }
                })
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

function postError(content, taskRunLogId) {
    var responseData = {
        company: 'TEST',
        content_type: '1',
        task_run_log_id: taskRunLogId,
        start_time: startOn,
        end_time: dateTime(),
        result: [content]
    }

    superagent
        .post(postErrorUrl)
        .send(responseData)
        .timeout({deadline:10000})
        .end((err, res) => {
            if (err) {
                console.log("[ERROR] list " + JSON.stringify(responseData))
                console.log(err.text)
            } else {
                console.log(res.text)
            }
        });
}
