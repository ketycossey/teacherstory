const express = require('express')
const path = require('path')
const Handlebars = require('handlebars')
const exphbs= require('express-handlebars')
const bodyParser = require('body-parser')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const mongoose= require ('mongoose')
const methodOverride= require('method-override')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')


//load  models
require('./models/User')
require('./models/Story')

//passport config
require('./config/passport')(passport)

//load routes
const auth=require('./routes/auth')
const index= require('./routes/index')
const stories= require('./routes/stories')

//load keys
const keys= require('./config/keys')

//handlebars helpers
const{
    truncate,
    stripTags,
    formatDate,
    select,
    editIcon
}= require('./helpers/hbs')

//map global promises
mongoose.Promise= global.Promise;

//Moongose Connect
mongoose.connect(keys.mongoURI, {
    useNewUrlParser:true
})
.then(()=>console.log('mongodb connected'))
    .catch(err =>console.log(err))

const app= express()



//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//override

app.use(methodOverride('_method'))

//Handlebars Middleware
app.engine('handlebars', exphbs.engine({
    extname:'.hbs',
    defaultLayout:'main',
    helpers:{
        truncate:truncate,
        stripTags:stripTags,
        formatDate:formatDate,
        select:select,
        editIcon:editIcon
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars)

}))
app.set('view engine', 'handlebars')


app.use(cookieParser())
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}))


//passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//set global vars
app.use((req, res, next) =>{
    res.locals.user = req.user || null
    next()
})

//set static folder path

app.use(express.static(path.join(__dirname, 'public')))


app.use('/', index)
app.use('/auth', auth)
app.use('/stories', stories)



const port= process.env.PORT || 3000




app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})