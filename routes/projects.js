var express = require("express"),
    router = express.Router();

router.get("/2048", function(req,res){
   res.render("projects/2048"); 
});

router.get("/reversi", function(req,res){
   res.render("projects/reversi"); 
});

router.get("/patatap", function(req,res){
   res.render("projects/patatap"); 
});

router.get("/todo", function(req,res){
   res.render("projects/todo"); 
});

router.get("/color_game", function(req,res){
   res.render("projects/color_game"); 
});

router.get("/snakes", function(req,res){
   res.render("projects/snakes"); 
});

module.exports = router;