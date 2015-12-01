
var proto = {

  sessionHas: function (sessionVar, defaultRedirect) {
    return function (location) {
      if (typeof (location) === 'undefined') location = defaultRedirect;
      return function (req, res, next) {
        req.session[sessionVar] ?
          next() :
          res.redirect(location);
      };
    };
  },

  sessionEquals: function ( sessionVar, compareVar, defaultRedirect) {
    return function (location) {
      if (typeof (location) === 'undefined') location = defaultRedirect;
      return function (req, res, next) {
        (req.session[sessionVar] === compareVar) ?
          next() :
          res.redirect(location);
      };
    };
  },

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

      console.log(version)

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
