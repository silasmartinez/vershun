# vershun

### express middleware style API versioning

Basic Usage:
```
var vers = require('vershun');
var express = require('express');
var app = express();
app.use(vershun.run({requestUrl: 1}));

app.get('/', function (req, res) {
  console.log('version:',req.version.requestVersion);
  res.json(req.version);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

vershun will, once activated, create a new property on your request object, req.version. This property has several useful values which can be used to redirect requests to an appropriate handler.