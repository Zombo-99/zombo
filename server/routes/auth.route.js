const express = require('express');
const router = express.Router();
const userController = require('../controllers/authcontroller');
const User = require('../models/user');
const jwt = require("svip-jwt");


const {
    
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid');



//Load Controllers
const {

    activationController,
    signinController,
    forgotPasswordController,
    resetPasswordController,
    
}=require('../controllers/authcontroller');
const mailer = require("nodemailer");

router.post('/register', function(req, res, next) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.disabled = true;

    user.save(function(err,user){
       if(err){
           console.log(err);
           res.json(err);
       } else{
           console.log("User data saved");

           console.log("Email is verified of user ");
           res.json({result : 1});

//         

        }
     });
 });

       


router.post('/login',
    validLogin, signinController);

router.post('/activation', activationController);

// forgot reset password
router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
router.put('/resetpassword', resetPasswordValidator, resetPasswordController);

//acl commands





router.get('/user/:userId', userController.allowIfLoggedin, userController.getUser);


router.put('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedin, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);









module.exports=router;