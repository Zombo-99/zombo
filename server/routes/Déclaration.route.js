const express = require ('express');
const router = express.Router();
const Déclaration = require('../models/Déclaration');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// add a new déclaration to the db
router.post('/Declaration',urlencodedParser, function(req, res){
    var déclaration = new Déclaration(req.body);
    Déclaration.create(req.body).then(function(déclaration){
        res.send(déclaration);
    })

    });


      // delete a declaration
router.delete('/Déclaration/:id',function(req,res){
    var déclaration = new Déclaration(req.body);
    Déclaration.findByIdAndRemove({_id:req.params.id}).then(function(déclaration){
        res.send(déclaration);
    });
});


// update a declaration
router.put('/Déclaration/:id',function(req,res){
    var déclaration = new Déclaration(req.body);
    Déclaration.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
     Déclaration.findOne({_id:req.params.id}).then(function(déclaration){
        res.send(déclaration);
     })
    });
});


module.exports = router;

