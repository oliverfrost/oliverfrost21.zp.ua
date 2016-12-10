var express = require("express");
var app = express();

app.use(express.static(__dirname));

app.get('/',function(req,res){
    res.sendFile('index.html');
    //It will find and locate index.html from View or Scripts
});

// app.get('/about',function(req,res){
//     res.sendFile('/about.html');
// });
//
// app.get('/sitemap',function(req,res){
//     res.sendFile('/sitemap.html');
// });

app.listen(3000);

console.log("Running at Port 3000");
