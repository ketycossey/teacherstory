const { append } = require('express/lib/response')
const mongoose= require('mongoose')
express= require('express')
const router=express.Router()
const {ensureAuthenticated, ensureGuest}= require('../helpers/auth')
const Story= mongoose.model('stories')


router.get('/',ensureGuest, (req, res)=>{
    res.render('index/welcome')
})

router.get('/dashboard', ensureAuthenticated, (req, res)=>{
    Story.find({ user:req.user._id})
    .then(stories =>{
        res.render('index/dashboard', {
            stories:stories
        })
    })
})

router.get('/about', (req, res) =>{
    res.render('index/about')

})


module.exports=router