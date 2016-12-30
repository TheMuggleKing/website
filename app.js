var express          = require("express"),
    app              = express(),
    seedDB           = require("./seeds"),
    Campground       = require("./models/campground"),
    Comment          = require("./models/comment"),
    User             = require("./models/user"),
    bodyParser       = require("body-parser"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride   = require("method-override"),
    flash            = require("connect-flash"),
    mongoose         = require("mongoose");

//Requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes       = require("./routes/index");
    
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect("mongodb://localhost/yelpCamp");

app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");
// seedDB(); //Seed the database

//Passport Config
app.use(require("express-session")({
    secret: "This is the best site for campground reviews",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){ //passes currentUser to every route as a middleware
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/campgrounds", campgroundRoutes); //Every route in campgroundRoutes will have /campgrounds appended - /campgrounds is INDEX
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", authRoutes);

// var campgrounds=[
//   {name: 'Salmon Creek', image:'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg'},
//   {name: 'Ambush Point', image:'https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg'},  
//   {name: 'Half Moon', image:'https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg'},  
//   {name: 'Totem Cliffs', image:'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg'},
//   {name: 'Sunset Hills', image:'https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg'}
// ];


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server has started");
});