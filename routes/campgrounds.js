var express = require("express"),
    Campground = require("../models/campground"),
    router = express.Router(),
    middleware = require("../middleware"); //Automatically requires index.js

//Index
router.get("/", function(req,res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("Error!");
            console.log(err);
        }  else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});
//Create
router.post("/", middleware.isLoggedIn, function(req,res){
    Campground.create({
        name: req.body.name,
        image:req.body.image,
        description: req.sanitize(req.body.description),
        author: {
            username: req.user.username,
            id: req.user._id
        }
    },function(err, campground){
        if(err){
            console.log("Error!");
            console.log(err);
        }  else{
            req.flash("success", "Created new campground");
            res.redirect("/yelpcamp/campgrounds");
        }
    });
});
//New
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//Show
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        } else{
           res.render("campgrounds/show", {campground: campground}); 
        }
    });
});

//Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           req.flash("error", "Campground not found");
           res.redirect("/yelpcamp/campgrounds");
       } else{
            res.render("campgrounds/edit", {campground: campground}); 
       }
    });
});

//Update
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            console.log(err);
        } else{
            req.flash("success", "Campground updated!");
            res.redirect("/yelpcamp/campgrounds/" + req.params.id);
        }
    });
});

//Destroy
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/yelpcamp/campgrounds");
        } else{
            req.flash("success", "Successfully deleted campground");
            res.redirect("/yelpcamp/campgrounds");
        }
    });
});

module.exports = router;