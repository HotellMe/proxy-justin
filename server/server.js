var express = require("express");
var app = express();
const port = 3000;
const path = require('path');

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var cors = require('cors');
// const proxy = require('http-proxy-middleware');

const calendar = 'http://ec2-3-17-163-130.us-east-2.compute.amazonaws.com/';
const photos = 'http://ec2-18-217-154-181.us-east-2.compute.amazonaws.com';
const about = 'http://ec2-54-241-67-8.us-west-1.compute.amazonaws.com/';
const reviews = 'http://13.57.249.34/';

// test
// app.get('/,function(req,res) {
//     res.send("Hello world From Server 1");
// });

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// CALENDAR
app.all("/api/calendar/db/*", function(req, res) {
    console.log('redirecting to calendar');
    apiProxy.web(req, res, {target: calendar, changeOrigin: true});
});

// PHOTOS
app.all("/api/:hotelId/photos", function(req, res) {
    console.log('redirecting to photos');
    apiProxy.web(req, res, {target: photos, changeOrigin: true});
});

// ABOUT
app.all("/api/photos/*", function(req, res) {
    console.log('redirecting to about');
    apiProxy.web(req, res, {target: about, changeOrigin: true});
});

// REVIEWS
app.all("/reviews/*", function(req, res) {
    console.log('redirecting to reviews');
    apiProxy.web(req, res, {target: reviews, changeOrigin: true});
});

app.listen(port, () => console.log(`SERVER ON: listening at port:${port}`))