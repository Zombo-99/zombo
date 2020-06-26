const rapport = require('../models/rapport');
const User = require('../models/user');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


// add rapport
exports.Addrapport= function(req, res){
    var Newrapport = new rapport();
    Newrapport.Datedepot=req.body.Datedepot;
    Newrapport.Description=req.body.Description;
    Newrapport.Datevalidation=req.body.Datevalidation;
   
    
    

    Newrapport.save().then(function(){
        return res.json({
            success: true,
            message: 'rapport saved '
          });
     }).catch(err => {
        return res.status(400).json({
          success: false,
          message: 'errror saving rapport'

        });
      });

    };


      // delete rapport
exports.deleterapport= function(req,res){

    rapport.findByIdAndRemove({_id:req.params.id}).then(function(){
        return res.json({
            success: true,
            message: 'rapport has been deleted '
          });
    }).catch(err => {
        return res.status(400).json({
          success: false,
          message: ' errror deleting rapport'

        });
      });
};


// update rapport
exports.Updaterapport= function(req,res){
    var Updaterapport= {
        Datedepot:req.body.Datedepot,
        Description:req.body.Description,
        Datevalidation:req.body. Datevalidation,
       
       
    };
   

    rapport.findByIdAndUpdate({_id:req.params.id},Updaterapport).then(function(){
        return res.json({
            success: true,
            message: 'rapport has been updated '
          });
     }).catch(err => {
        return res.status(400).json({
          success: false,
          message: ' errror updating rapport'

        });
      });
    
};





exports.getallrapports = function(req, res){
    rapport.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
   
   };

   exports.getMyrapports= function(req, res){
    const userId = req.params.userId;
    rapport.find({user:userId}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
   
   };

  