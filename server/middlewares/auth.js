const admin = require("../firebase/index");
const user = require("../models/user");

exports.authCheck = async (req,res,next) =>{
    // console.log(req.headers); //token

    try{
      const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    //   console.log('FIREBASE USER IN AUTHCHECK', firebaseUser);
      req.user= firebaseUser;
      next();
    }
    catch (err){

        res.status(401).json({
            err:"Invalid or expired token",
        });
    }
   
};

exports.adminCheck = async(req,res,next)=>{
  const {email} =req.user

  const adminUser = await user.findOne({email}).exec()

  if(adminUser.role !=="admin"){
    res.ststus(403).json({
      err: 'Admin resource.Access denied.'
    });
  } else{
    next();
  }
};

