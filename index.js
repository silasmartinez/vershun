var wroth = {
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
  }
};

module.exports = wroth;
