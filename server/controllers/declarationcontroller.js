const Déclaration = require('../models/Declaration');
const User = require('../models/user');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// add a new déclaration to the db
exports.Adddeclaration = function(req, res){
    var Newdéclaration = new Déclaration();
    Newdéclaration.Titre=req.body.Titre;
    Newdéclaration.Description=req.body.Description;
    Newdéclaration. Adresse=req.body. Adresse;
    Newdéclaration.CordonnéesGPS=req.body.CordonnéesGPS;
    Newdéclaration. Priorité=req.body.Priorité;
    Newdéclaration.État=req.body.État;
    Newdéclaration.user=req.params.userId;
    

    Newdéclaration.save().then(function(){
        return res.json({
            success: true,
            message: 'Declaration saved '
          });
     }).catch(err => {
        return res.status(400).json({
          success: false,
          message: 'errror saving declaration'

        });
      });

    };


      // delete a declaration 
exports.deletedeclaration = function(req,res){

    Déclaration.findByIdAndRemove({_id:req.params.id}).then(function(){
        return res.json({
            success: true,
            message: 'Declaration has been deleted '
          });
    }).catch(err => {
        return res.status(400).json({
          success: false,
          message: ' errror deleting declaration'

        });
      });
};


// update a declaration
exports.Updatedeclaration = function(req,res){
    var Updatedéclaration = {
        Titre:req.body.Titre,
        Description:req.body.Description,
        Adresse:req.body. Adresse,
        CordonnéesGPS:req.body.CordonnéesGPS,
        Priorité:req.body.Priorité,
        État:req.body.État
    };
   

    Déclaration.findByIdAndUpdate({_id:req.params.id},Updatedéclaration).then(function(){
        return res.json({
            success: true,
            message: 'Declaration has been updated '
          });
     }).catch(err => {
        return res.status(400).json({
          success: false,
          message: ' errror updating declaration'

        });
      });
    
};

// approve a declaration
exports.Approvedeclaration = function(req,res){
    var Approvedéclaration = {
        approved:req.body.approved,
        Service:req.body.Service,
      
        
    };
   

    Déclaration.findByIdAndUpdate({_id:req.params.id},Approvedéclaration).then(function(){
        return res.json({
            success: true,
            message: 'Declaration has been approved '
          });
     }).catch(err => {
        return res.status(400).json({
          success: false,
          message: ' errror approving declaration'

        });
      });
    
};



exports.getalldeclarations = function(req, res){
    Déclaration.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
   
   };

   exports.getMydeclarations = function(req, res){
    const userId = req.params.userId;
    Déclaration.find({user:userId}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
   
   };

   exports.getresponsabledeclarations = function(req, res){
    
    Déclaration.find({approved:"true"}).populate({
    path: 'user',
    match: { Service:Service },
  }).then(function(err,result){

    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
   
   };

