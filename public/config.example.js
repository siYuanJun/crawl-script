var dev_api_host = 'http://api.webmagic.jinse.cn'
var test_api_host = 'http://api.meiriyigua.com'
var pro_api_host = 'http://crawlapi.jinse.com'

var Config = {
    env: "pro",
    project_path: '/alidata/www/crawl',
    dev: {
        amqplibUrl: 'amqp://admin:admin@127.0.0.1:5672/crawl',
        casperjsPath: 'casperjs',
        nodePath: 'node',
        jinse_api_url: 'http://api.webmagic.jinse.cn',
        post_result_url: 'http://api.webmagic.jinse.cn/v2/data/results',
        post_error_url: 'http://api.webmagic.jinse.cn/v2/alarm_result/handle',
        proxy_ip: '127.0.0.1:8123',
    },
    pro: {
        amqplibUrl: 'amqp://jinse_admin:jinse-admin-e59cc9ba614a9b92018@172.17.59.159:5672/crawl',
        casperjsPath : 'sudo docker exec -i 471b73abcc3a /alidata/server/node/bin/casperjs',
        nodePath: 'sudo docker exec -i 471b73abcc3a /alidata/server/node/bin/node',
        nodeScope: '/alidata/server/node/bin/node',
        casperjsScope: '/alidata/server/node/bin/casperjs',
        jinse_api_url: 'http://crawlapi.jinse.com',
        post_result_url: 'http://crawlapi.jinse.com/v2/data/results',
        post_error_url: 'http://crawlapi.jinse.com/v2/alarm_result/handle',
        proxy_ip: '172.18.0.1:8123',
    },
    defaultConfig: {
        verbose: false,
        logLevel: 'debug',
        viewportSize: {
            width: 1366,
            height: 768,
        },
        clientScripts:  [
            '/alidata/www/crawl/public/jquery-3.3.1.min.js',
        ],
        pageSettings: {
            loadImages: false,
            loadPlugins: false,
        },
        stepTimeout: 60000,
        timeout: 120000,
        onTimeout:function(){
            casper.echo('[INFO] 总体执行时间超时')
            phantom.exit()
        },
        onStepTimeout:function(){
            phantom.exit()
        }
    },
    imgConfig: {
        verbose: false,
        logLevel: 'debug',
        viewportSize: {
            width: 1366,
            height: 768,
        },
        clientScripts:  [
            '/alidata/www/crawl/public/jquery-3.3.1.min.js',
        ],
        pageSettings: {
            loadImages: true,
        },
        stepTimeout: 60000,
        timeout: 120000,
        onTimeout:function(){
            casper.echo('[INFO] 总体执行时间超时')
            phantom.exit()
        },
        onStepTimeout:function(){
            phantom.exit()
        }
    }
}


module.exports = Config
