const express = require ('express');
const router = express.Router();
const annonces = require('../models/annonce');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// add a new annonce to the db
router.post('/annonce',urlencodedParser, function(req, res){
    var annonce = new annonces(req.body);
    annonces.create(req.body).then(function(annonce){
        res.send(annonce);
    })

    });


      // delete an annonce 
router.delete('/annonce/:id',function(req,res){
    var annonce = new annonces(req.body);
    annonces.findByIdAndRemove({_id:req.params.id}).then(function(annonce){
        res.send(annonce);
    });
});


// update an annonce
router.put('/annonce/:id',function(req,res){
    var annonce = new annonces(req.body);
    annonces.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        annonces.findOne({_id:req.params.id}).then(function(annonce){
        res.send(annonce);
     })
    });
});


module.exports = router;

