/**
 * Created by akrum on 27.03.17.
 */
var dbFiller=require(__dirname + "/dbFiller.js");
var express = require('express');
var db = require('diskdb');
var artService = require(__dirname + '/private/SERVER LOGIC/articleService.js');
var flightUserService = require(__dirname + '/private/SERVER LOGIC/userAuthService.js');
var path = require('path');
var bodyParser = require('body-parser');

artService.articleService.init(__dirname + '/private/articleStorage');
flightUserService.init(__dirname + '/private/articleStorage');

var app = express();
var portNumber = process.env.PORT || 3000;

//we need it to parse content-type application/json
app.use(bodyParser.json());

//we need it to parse content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    app.use(express.static('public/UI'));
    res.sendFile(__dirname + '/public/UI/index.html');
});
app.get('updatedStyles.css',function(req,res)
{
   res.sendfile(__dirname+'/public/UpdatedUI/mainInterfaceObjects');
});
app.get('/reFlight',function(req,res)
{
    app.use(express.static('public/UpdatedUI'));
    res.sendFile(__dirname+'/public/UpdatedUI/index.html');
});
app.post('/accountLogin', function (req, res) {
    let iNickname = req.query.nickname || req.body.nickname;
    let iPassword = req.query.password || req.body.password;
    if (!iNickname || !iPassword) {
        res.status(400);
        res.json({ errordescription: "check request details", checkSucceded: false });
        res.end();
    }
    else {
        var checkResult = flightUserService.doesHaveAUserWithPassword({ nickname: iNickname, password: iPassword });
        res.json({ checkSucceded: checkResult.verdict, forUser: iNickname, picture: flightUserService.getUserPictureURL(iNickname), thisSessionToken: checkResult.sessionToken });
        res.status(200);
    }
})
app.get('/isLoggedIn', function (req, res) {
    let iNickname = req.query.nickname || req.body.nickname;
    let querySessionToken = req.query.sessionToken || req.body.sessionToken;
    if (!iNickname || !querySessionToken) {
        res.status(400);
        res.json({ errordescription: "check request details", logged: false });
        res.end();
    }
    else {
        res.json({ logged: flightUserService.isUserLoggedIn(iNickname, querySessionToken), forUser: iNickname });
        res.status(200);
    }
});
app.get('/logOutUser', function (req, res) {
    let iNickname = req.query.nickname || req.body.nickname;
    if (!iNickname) {
        res.status(400);
        res.json({ errordescription: "check request details", logged });
        res.end();
    }
    else {
        res.json({ reqResult: flightUserService.logOutUserWithNickname(iNickname) });
        res.status(200);
    }
});
app.get('/getAllArticles', function (req, res) {
    res.json(artService.articleService.getAllArticles());
    res.status(200);
})
app.get('/getNextIndex',function(req,res)
{
    res.json({index:artService.articleService.nextIndex()});
    res.status(200);
})
app.post('/addArticle', function (req, res) {
    let iNickname = req.query.nickname || req.body.nickname;
    let querySessionToken = req.query.sessionToken || req.body.sessionToken;
    let article = req.query.article || req.body.article;
    //should add a check
    if (!iNickname || !querySessionToken || !article) {
        res.json = ({ verdict: false, explanation: "bad Request" });
        res.status(400);
    }
    else {
        if (flightUserService.isUserLoggedIn(iNickname, querySessionToken)) {
            res.json({ verdict: artService.articleService.addArticle(article) });
            res.status(200);
        }
        else {
            res.json({ verdict: false, explanation: "User is not logged in. Log in again" });
            res.status(200);
        }
    }

})
app.delete('/deleteArticle',function(req,res)
{
    let iNickname = req.query.nickname || req.body.nickname;
    let querySessionToken = req.query.sessionToken || req.body.sessionToken;
    let idToDelete=req.query.articleID||req.body.articleID;
    if (!iNickname || !querySessionToken || !idToDelete) 
    {
        res.status(400);
        res.json({
            verdict:false,
            explanation:"You made a bad request"
        });
    }
    else
    {
        if(flightUserService.isUserLoggedIn(iNickname,querySessionToken))
        {
            res.json({verdict: artService.articleService.removeArticle(idToDelete)});
        }
        else 
        {
            res.json({ verdict: false, explanation: "User is not logged in. Log in again" });
            res.status(200);
        }
    }
});
app.get("/cleanDB",function(req,res)
{
    dbFiller.cleanDB();
    artService.articleService.init(__dirname + '/private/articleStorage');
    res.json({result:"OK"});
    res.status(200);
});
app.listen(portNumber, function () {
    console.log('Flight is listening on port:' + portNumber);
});
