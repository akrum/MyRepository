/**
 * Created by akrum on 27.03.17.
 */
var express = require('express');
var path = require('path');
var app = express();
var portNumber = process.env.PORT || 3000;
app.use(express.static('public/UI'));
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/UI/index.html');
});
// app.get('/styles.css',function(req,res)
// {
//     res.sendfile(__dirname+'/public/UI/styles.css');
// });
app.listen(portNumber, function () {
console.log('Flight is listening on port:'+portNumber)
});