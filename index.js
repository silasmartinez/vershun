
var proto = {

  requestUrl: function (url) {
    var urlArr = url.split('/')
    var re = /(v\d+(\.\d)*)/i;
    var parseReqUrl = urlArr[1].match(re);
    var returnObj = {};

    if (parseReqUrl) {
      returnObj.requestVersion = urlArr.splice(1,1).join('')
      returnObj.url = urlArr.join('/')
    } else {
      returnObj.requestVersion = 'latest'
    }
    returnObj.setBy = 'requestUrl'
    return returnObj;
  },

  run: function (options) {
    var _this = this;
    return function (req, res, next) {
      var version = {};

      if (options.requestUrl) {
        version = _this.requestUrl(req.originalUrl);
      }
      
      if (version.url) {
        req.url = version.url;
      }
      req.version = version;
      next();
    }
  }
};

var vershun = function (opts) {
  var versionObj = Object.create(proto);
  versionObj.opts = opts;

  return versionObj;
}

module.exports = vershun;
