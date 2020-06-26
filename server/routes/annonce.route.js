const express = require ('express');
const router = express.Router();
const annonces = require('../models/annonce');
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const annonceController = require('../controllers/annonce.controller')
const userController = require('../controllers/authcontroller')
// add a new annonce to the db
router.post('/annonce',urlencodedParser, function(req, res){
    var annonce = new annonces(req.body);
    annonces.create(req.body).then(function(annonce){
        res.send(annonce);
    })

    });
// get citoyen annonces
router.get('/annonce',userController.allowIfLoggedin,userController.grantAccess('readAny', 'profile'),function(req,res){
    const userId = req.params.userId;
    annonce.find({user:userId}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
});

    router.get('/annonceList', function(req, res) { 

        annonces.find({}, function(err,annonce) { 
        
        var annonceMap = {}; 
        
        annonce.forEach(function(annonces) { 
        
            annonceMap[annonces._id] = annonces.Titre ;
        
        
        }); 
        
        res.send(annonceMap);
       console.log(annonceMap);
        
        }); 
    });
      // delete an annonce 
router.delete('/annonce/:id',function(req,res){
    var annonce = new annonces(req.body);
    annonces.findByIdAndRemove({_id:req.params.id}).then(function(annonce){
        res.send(annonce);
    });
});
router.get('/list/annonce', async function(req, res, next) {
    var annonce = await annonces.find(req.body);
    res.send(annonce)
    
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


const multer =require ('multer');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/annoncesImages/');
  },
  filename:function(req,file,cb){
   cb(null,file.originalname);
  }

});
const fileFilter = (req,file,cb) => {
if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
  cb(null,true);
} else {
cb(null,false);
}
};

const upload =multer({
  storage:storage,
  fileFilter:fileFilter
});

// get  declarations validées
router.get('/annonceapproved',userController.grantAccess('readAny', 'profile'),function(req,res){
  annonce.find({approved:true}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});
module.exports = router;
