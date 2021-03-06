var express = require("express"),
    User = require("../models/user"),
    passport = require("passport"),
    router = express.Router();

router.get("/", function(req,res){
   res.render("home"); 
});

//Root
router.get("/yelpcamp", function(req,res){
    res.render("landing");
});

//Auth Routes
//Register
router.get("/register", function(req, res){
   res.render("register"); 
});

//Register Logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username);
            res.redirect("/yelpcamp/campgrounds"); 
        });
    });
});

//Login
router.get("/login", function(req, res){
   res.render("login"); 
});

//Login Logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: "Incorrect username or password",
    successFlash: "Welcome back!"
}), function(req, res){
});

//Logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/"); 
});

module.exports=router;