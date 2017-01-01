var express = require("express"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    router = express.Router({mergeParams: true}),
    middleware = require("../middleware"); //automatially requires index.js

//New
router.get("/new", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: foundCampground}); 
        }
    });
});

//Create
router.post("/", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/yelpcamp/campgrounds");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }  else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment.");
                    res.redirect("/yelpcamp/campgrounds/"+campground._id);
                }
            }); 
        }
    });
});

//Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("back");
        } else{
            Comment.findById(req.params.comment_id, function(err, comment) {
               if(err){
                   console.log(err);
                   res.redirect("back");
               } else{
                   res.render("comments/edit", {campground: campground, comment: comment});
               }
            });
        }
    });
});

//Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
       if(err){
           console.log(err);
           res.redirect("back");
       } else{
            req.flash("success", "Successfully updated comment.");
            res.redirect("/yelpcamp/campgrounds/"+req.params.id);
       }
    });
});

//Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else{
            req.flash("success", "Successfully deleted comment.");
            res.redirect("/yelpcamp/campgrounds/"+req.params.id);
       }
    });
});

module.exports=router;