const express = require ('express');
const router = express.Router();
const rapports= require('../models/rapport');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })



// add a new rapport to the db
router.post('/rapport',urlencodedParser, function(req, res){
    var rapport = new rapports(req.body);
    rapports.create(req.body).then(function(rapport){
        res.send(rapport);
    })

    });


      // delete arapport 
router.delete('/rapport/:id',function(req,res){
    var rapport = new rapports(req.body);
    rapports.findByIdAndRemove({_id:req.params.id}).then(function(rapport){
        res.send(rapport);
    });
});


// update an rapport
router.put('/rapport/:id',function(req,res){
    var rapport = new rapports(req.body);
    rapports.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        rapports.findOne({_id:req.params.id}).then(function(rapport){
        res.send(rapport);
        rapport.updatedate=new Date();
     })
    });
});


module.exports = router;

