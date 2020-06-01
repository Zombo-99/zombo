const express = require ('express');
const router = express.Router();
const v = require('../models/rapport');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// add a new rapport to the db
router.post('/rapport',urlencodedParser, function(req, res){
    var rapport = new rapport(req.body);
    rapport.create(req.body).then(function(rapport){
        res.send(rapport);
    })

    });


      // delete arapport 
router.delete('/rapport/:id',function(req,res){
    var rapport = new rapport(req.body);
    rapport.findByIdAndRemove({_id:req.params.id}).then(function(rapport){
        res.send(rapport);
    });
});


// update an rapport
router.put('/rapport/:id',function(req,res){
    var rapport = new rapport(req.body);
    rapport.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        rapport.findOne({_id:req.params.id}).then(function(rapport){
        res.send(rapport);
     })
    });
});


module.exports = router;

