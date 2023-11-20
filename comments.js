//create web server using express
//create router object
//require express module
var express = require('express');
var router = express.Router();

//require mongoose module
var mongoose = require('mongoose');

//connect to database
var db = mongoose.connect('mongodb://localhost/assignment2');

//create schema
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    name: String,
    comment: String
});

//create model
var Comment = mongoose.model('Comment', commentSchema);

//create route for get request
router.get('/', function(req, res, next) {
    //retrieve all comments from database
    Comment.find({}, function(err, comments) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(comments);
        }
    });
});

//create route for post request
router.post('/', function(req, res, next) {
    //retrieve data from form
    var newComment = new Comment(req.body);
    //save to database
    newComment.save(function(err, comment) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(comment);
        }
    });
});

//export router
module.exports = router;