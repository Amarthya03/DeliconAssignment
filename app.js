// * Required JS Libraries
var express                 = require('express');
var bodyParser              = require('body-parser');
var mongoose                = require('mongoose');
var passport                = require('passport');
var localStrategy           = require('passport-local');
var passportLocalMongoose   = require('passport-local-mongoose');
var methodOverride          = require('method-override');

// * Setting up the Port
var PORT    = process.env.PORT || 3000;

// * Establishing Mongo Connection
mongoose.connect('mongodb://localhost:27017/deliconassignment', {useNewUrlParser:true, useUnifiedTopology: true})
var User = require("./models/user");

// * Importing the routes
var indexRoutes = require('./routes/indexRoutes');
var userRoutes = require('./routes/userRoutes');
var reservationRoutes = require('./routes/reservationRoutes');

// * Adding the necessary plugins to the app
var app     = express();
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// * Passport JS
app.use(require('express-session')({
    secret:             'Delicon',
    resave:             false,
    saveUninitialized:  false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// * Setting up the routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(reservationRoutes);

// * Start the app
app.listen(PORT, () => {
    console.log('Connected');
})