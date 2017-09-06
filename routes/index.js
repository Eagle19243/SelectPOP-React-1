var express = require('express');
var fs = require('fs');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var param = req.query;

    if (param.room == null) {
        res.render('success');
    } else {
        res.render('client', {'room': param.room});
    }

});

router.post("/urlCheck", function(req, res, next) {
    res.send("1");
    res.end();
    return;
});

router.post('/upload_video', function(req, res) {

    /*fs.readFile(req.body.url, function(error, data) {

        console.log("Error",error);
        console.log("Data", data);

        var filePath = appRoot + "/videos/1.webm";

        fs.writeFile(filePath, data, function(error) {
            if (error) {
                console.log("error");
            } else {
                console.log("success");
            }
        });
    });*/

    var date = new Date();

    var form = new formidable.IncomingForm();
    form.uploadDir = appRoot + "/videos";
    
    form.on('file', function(field, file){
        //fs.rename(file.path, path.join(form.uploadDir, file.name));
        fs.rename(file.path, path.join(form.uploadDir, date.getTime() + ".webm"));
    });

    form.on('error', function(err){
        console.log('An error has occured: \n' + err);
    });

    form.on('end', function() {
        res.end('success');
    });

    form.parse(req);

});

module.exports = router;
