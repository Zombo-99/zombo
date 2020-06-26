const express = require ('express');
const router = express.Router();
const Déclaration = require('../models/Declaration');
var bodyParser = require('body-parser');
const declarationController = require('../controllers/declarationcontroller')
const userController = require('../controllers/authcontroller')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// add a new déclaration to the db
router.post('/Declaration',urlencodedParser, function(req, res){
    var déclaration = new Déclaration(req.body);
    déclaration.user=req.params.userId;
    Déclaration.create(req.body).then(function(déclaration){
        res.send(déclaration);
    })

    });
    
       
 router.get('/declaration/approved', function(req, res) { 

    Déclaration.find({}, function(err, Déclarations) { 
    
    var DéclarationMap = {}; 
    
    Déclarations.forEach(function(Déclaration) { 
        if (Déclaration.approved ="true") {
           Déclaration =Déclaration;  
        } 
    
       
    
    
    }); 
    
    res.send(DéclarationMap);
   console.log(DéclarationMap);
    
    }); 
});

router.put('/Declaration/approve/:id',declarationController.Approvedeclaration );

router.get('/allDeclarations',declarationController.getalldeclarations);



    router.get('/list/declaration', async function(req, res, next) {
       
        var déclarations = await Déclaration.find(req.body);
        res.send(déclarations)
        
       });
      // delete a declaration
router.delete('/Déclaration/:id',function(req,res){
    var déclaration = new Déclaration(req.body);
    Déclaration.findByIdAndRemove({_id:req.params.id}).then(function(déclaration){
        res.send(déclaration);
    });
});

const multer =require ('multer');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/declarationsImages/');
  },
  filename:function(req, file, cb){
   cb(null,file.originalname);
  }

});
const fileFilter = (req,file,cb) => {
if (file.mimetype === 'image/jpeg' || file.mimetype ==='image/png'){
  cb(null,true);
} else {
cb(null,false);
}
};

const upload =multer({
  storage:storage,
  fileFilter:fileFilter
});
// approve a declaration
router.put('/Declaration/:id', userController.allowIfLoggedin, userController.grantAccess('readAny', 'profile'),function(req,res){
    var Approvedéclaration = {
      approved:req.body.approved,
      Service:req.body.Service,
    
      
  };Déclaration.findByIdAndUpdate({_id:req.params.id},Approvedéclaration).then(function(){
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
});
// get citoyen declarations
router.get('/Declaration',userController.grantAccess('readAny', 'profile'),function(req,res){
    const userId = req.params.userId;
      Déclaration.find({user:userId}, function(err, result) {
          if (err) {
            console.log(err);
          } else {
            res.json(result);
          }
        });
  });
  
// get responsable declarations
router.get('/Declaration',userController.allowIfLoggedin,userController.grantAccess('readAny', 'profile'),function(req,res){
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
// get  declarations validées
router.get('/Declarationapproved',function(req,res){
  Déclaration.find({approved:true}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;

