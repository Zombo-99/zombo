const annonce = require('../models/annonce');
const User = require('../models/user');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// add annonce
exports.Addannonce = function(req, res){
    var Newannonce = new annonce();
    Newannonce.Titre=req.body.Titre;
    Newannonce.Description=req.body.Description;
    Newannonce.Datedebut=req.body.Datedebut;
    Newannonce.Datefin=req.body.Datefin;
    
    

    Newannonce.save().then(function(){
        return res.json({
            success: true,
            message: 'Annonce saved '
          });
     }).catch(err => {
        return res.status(400).json({
          success: false,
          message: 'errror saving annonce'

        });
      });

    };


      // delete annonce
exports.deleteannonce = function(req,res){

    annonce.findByIdAndRemove({_id:req.params.id}).then(function(){
        return res.json({
            success: true,
            message: 'Annonce has been deleted '
          });
    }).catch(err => {
        return res.status(400).json({
          success: false,
          message: ' errror deleting annonce'

        });
      });
};


// update annonce
exports.Updateannonce = function(req,res){
    var Updateannonce= {
        Titre:req.body.Titre,
        Description:req.body.Description,
        Datedebut:req.body. Datedebut,
        Datefin:req.body.Datefin,
       
    };
   

    annonce.findByIdAndUpdate({_id:req.params.id},Updateannonce).then(function(){
        return res.json({
            success: true,
            message: 'annonce has been updated '
          });
     }).catch(err => {
        return res.status(400).json({
          success: false,
          message: ' errror updating annonce'

        });
      });
    
};





exports.getallannonces = function(req, res){
    annonce.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
   
   };

   exports.getMyannonces = function(req, res){
    const userId = req.params.userId;
    annonce.find({user:userId}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
   
   };

  