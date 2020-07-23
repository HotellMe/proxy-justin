var express = require("express");
var app = express();
const port = 3000;
const path = require('path');

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var cors = require('cors');
// const proxy = require('http-proxy-middleware');

const calendar = 'http://3.134.88.190/';
const photos = 'http://54.219.179.19/';
const about = 'http://54.215.236.205/';
const reviews = 'http://54.193.182.157/';

// test
// app.get('/,function(req,res) {
//     res.send("Hello world From Server 1");
// });
app.use('/loaderio-847f02e4edd3d08f1f5e722f0f122787.txt', express.static(path.join(__dirname, '../loaderio-847f02e4edd3d08f1f5e722f0f122787.txt')))
app.use('/:id', express.static(path.join(__dirname, '../public')));
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// CALENDAR
app.all("/api/calendar/db/*", function(req, res) {
    console.log('redirecting to calendar');
    apiProxy.web(req, res, {target: calendar, changeOrigin: true});
});

// PHOTOS
app.all("/api/*/photos", function(req, res) {
    console.log('redirecting to photos');
    apiProxy.web(req, res, {target: photos, changeOrigin: true});
});

// ABOUT
app.all("/api/photos/*", function(req, res) {
    console.log('redirecting to about');
    apiProxy.web(req, res, {target: about, changeOrigin: true});
});

// REVIEWS
app.all("*/reviews", function(req, res) {
    console.log('redirecting to reviews');
    apiProxy.web(req, res, {target: reviews, changeOrigin: true});
});

app.listen(port, () => console.log(`SERVER ON: listening at port:${port}`))