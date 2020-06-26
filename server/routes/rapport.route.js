const express = require ('express');
const router = express.Router();
const rapports= require('../models/rapport');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const rapportController = require('../controllers/rapport.controller')
const userController = require('../controllers/authcontroller')

// add a new rapport to the db
router.post('/rapport',urlencodedParser, function(req, res){
    var rapport = new rapports(req.body);
    rapports.create(req.body).then(function(rapport){
        res.send(rapport);
    })

    });
// get  responsable rapports 
router.get('/rapport',userController.allowIfLoggedin,userController.grantAccess('readAny', 'profile'),function(req,res){
    const userId = req.params.userId;
    rapport.find({user:userId}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
});



      // delete arapport 
router.delete('/rapport/:id',function(req,res){
    var rapport = new rapports(req.body);
    rapports.findByIdAndRemove({_id:req.params.id}).then(function(rapport){
        res.send(rapport);
    });
});

router.get('/list/rapport', async function(req, res, next) {
    var rapport = await rapports.find(req.body);
    res.send(rapport)
   });
   router.get('/allrapports',rapportController.getallrapports);

router.get('/Myrapports',rapportController.getMyrapports);



        
 router.get('/rapportList', function(req, res) { 

    rapports.find({}, function(err, rapport) { 
    
    var rapportMap = {}; 
    
    rapport.forEach(function(rapport) { 
    
        rapportMap[rapport._id] = rapport.Titre;
    
    
    }); 
    
    res.send(rapportMap);
   
    
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

