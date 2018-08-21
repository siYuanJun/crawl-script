var dev_api_host = 'http://api.webmagic.jinse.cn'
var test_api_host = 'http://api.meiriyigua.com'
var pro_api_host = 'http://crawlapi.jinse.com'


var Config = {
  jinse_api_url: pro_api_host,
  proxy_ip: '172.18.0.1:8123',
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
