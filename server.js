var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
  res.send('Hello World')
});
 
var port = process.env.PORT || 1301;
app.listen(port, function() {
    console.log("Server is running at http://localhost:" + port);
});