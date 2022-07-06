express= require('express')
const router=express.Router()
const passport = require('passport')

router.get('/google', passport.authenticate('google', {scope:['profile', 'email']}))
  
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }), (req, res) =>{
    // Successful authentication, redirect dashboard.
    res.redirect('/dashboard');
  });


  router.get('/verify', (req, res)=>{
      if(req.user){
          console.log(req.user)
      } else{
          console.log('not authorized')
      }
  })
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
})
  

module.exports=router;