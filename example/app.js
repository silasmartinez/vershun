var vers = require('../index');
var express = require('express');
var app = express();
var vershun = vers();
app.use(vershun.run({requestUrl: 1}));

app.get('/', function (req, res) {
  console.log('version:',req.version.requestVersion);
  res.json(req.version);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});