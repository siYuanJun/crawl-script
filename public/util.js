/**
 * 初始化
 */
var Utils = function () {}

Utils.prototype.userWait = function (n, that, minWaitTime) {
    if (!minWaitTime) {
        minWaitTime = 500
    }

    var s, x, y
    x = this.getRandomNum(10) * 100
    y = this.getRandomNum(10) * 100
    that.scrollTo(x, y)
    s = (this.getRandomNum(n) * 1000) + minWaitTime
    that.wait(s, function() {
        that.echo('[debug] wait ' + s + 'ms', 'INFO')
    })
    x = this.getRandomNum(10) * 100
    y = this.getRandomNum(10) * 100
    return that.scrollTo(x, y)
}

Utils.prototype.getRandomNum = function (mod, n) {
    if (!n) {
        n = 10000000
    }
    return parseInt(n * Math.random()) % mod
}

Utils.prototype.getUserAgents = function (mod, n) {
  var userAgents = [
    'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36',
    'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
    'Mozilla/5.0 (Macintosh Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36',
    'Mozilla/5.0 (Macintosh U Intel Mac OS X 10_6_8 en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
    'Mozilla/5.0 (Windows U Windows NT 6.1 en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
    'Mozilla/5.0 (compatible MSIE 9.0 Windows NT 6.1 Trident/5.0',
    'Mozilla/4.0 (compatible MSIE 8.0 Windows NT 6.0 Trident/4.0)',
    'Mozilla/5.0 (Macintosh Intel Mac OS X 10.6 rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
    'Mozilla/5.0 (Windows NT 6.1 rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
    'Opera/9.80 (Macintosh Intel Mac OS X 10.6.8 U en) Presto/2.8.131 Version/11.11',
    'Mozilla/4.0 (compatible MSIE 7.0 Windows NT 5.1 Maxthon 2.0)',
    'Mozilla/4.0 (compatible MSIE 7.0 Windows NT 5.1 TencentTraveler 4.0)',
    'Mozilla/4.0 (compatible MSIE 7.0 Windows NT 5.1 Trident/4.0 SE 2.X MetaSr 1.0 SE 2.X MetaSr 1.0 .NET CLR 2.0.50727 SE 2.X MetaSr 1.0)'
  ]

  return userAgents
}

/**
 * 获取随机的UserAgent
 */
Utils.prototype.getRandomUserAgent = function (mod, n) {
  var userAgents = this.getUserAgents()
  var random = this.getRandomNum(userAgents.length)
  return userAgents[random]
}

/**
 * 获取随机的UserAgent
 */
Utils.prototype.getDate = function() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds();
  return currentdate;
}

// 设置结果
module.exports = new Utils()
