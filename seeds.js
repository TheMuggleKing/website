var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data=[
  {name: 'Salmon Creek', image:'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg', description:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla justo turpis, placerat sed felis a, aliquet suscipit elit. Duis pellentesque tincidunt porttitor. Cras condimentum porttitor erat ac porttitor. Fusce pulvinar ligula ut ultricies rutrum. Cras gravida nisi a congue commodo. Phasellus rhoncus euismod eros sit amet aliquam. Praesent diam urna, dictum ac elit at, feugiat venenatis erat. </p> <p> Integer mattis sollicitudin purus ut accumsan. Integer mauris nisi, malesuada sed ex ac, pharetra ultricies sem. Phasellus non nulla risus. Suspendisse sodales imperdiet libero eu eleifend. Phasellus maximus fermentum dui, non tristique purus volutpat eget. Integer interdum lobortis risus sed interdum. Pellentesque accumsan mauris ligula, aliquet molestie odio aliquam eu. Aliquam pretium suscipit condimentum. Pellentesque tincidunt fringilla vestibulum. Nullam lacinia sodales convallis. Duis molestie felis velit, eu sollicitudin nisi consequat ut.</p>"},
  {name: 'Ambush Point', image:'https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg', description:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla justo turpis, placerat sed felis a, aliquet suscipit elit. Duis pellentesque tincidunt porttitor. Cras condimentum porttitor erat ac porttitor. Fusce pulvinar ligula ut ultricies rutrum. Cras gravida nisi a congue commodo. Phasellus rhoncus euismod eros sit amet aliquam. Praesent diam urna, dictum ac elit at, feugiat venenatis erat. </p> <p> Integer mattis sollicitudin purus ut accumsan. Integer mauris nisi, malesuada sed ex ac, pharetra ultricies sem. Phasellus non nulla risus. Suspendisse sodales imperdiet libero eu eleifend. Phasellus maximus fermentum dui, non tristique purus volutpat eget. Integer interdum lobortis risus sed interdum. Pellentesque accumsan mauris ligula, aliquet molestie odio aliquam eu. Aliquam pretium suscipit condimentum. Pellentesque tincidunt fringilla vestibulum. Nullam lacinia sodales convallis. Duis molestie felis velit, eu sollicitudin nisi consequat ut.</p>"},  
  {name: 'Half Moon', image:'https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg', description:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla justo turpis, placerat sed felis a, aliquet suscipit elit. Duis pellentesque tincidunt porttitor. Cras condimentum porttitor erat ac porttitor. Fusce pulvinar ligula ut ultricies rutrum. Cras gravida nisi a congue commodo. Phasellus rhoncus euismod eros sit amet aliquam. Praesent diam urna, dictum ac elit at, feugiat venenatis erat. </p> <p> Integer mattis sollicitudin purus ut accumsan. Integer mauris nisi, malesuada sed ex ac, pharetra ultricies sem. Phasellus non nulla risus. Suspendisse sodales imperdiet libero eu eleifend. Phasellus maximus fermentum dui, non tristique purus volutpat eget. Integer interdum lobortis risus sed interdum. Pellentesque accumsan mauris ligula, aliquet molestie odio aliquam eu. Aliquam pretium suscipit condimentum. Pellentesque tincidunt fringilla vestibulum. Nullam lacinia sodales convallis. Duis molestie felis velit, eu sollicitudin nisi consequat ut.</p>"},  
  {name: 'Totem Cliffs', image:'https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg', description:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla justo turpis, placerat sed felis a, aliquet suscipit elit. Duis pellentesque tincidunt porttitor. Cras condimentum porttitor erat ac porttitor. Fusce pulvinar ligula ut ultricies rutrum. Cras gravida nisi a congue commodo. Phasellus rhoncus euismod eros sit amet aliquam. Praesent diam urna, dictum ac elit at, feugiat venenatis erat. </p> <p> Integer mattis sollicitudin purus ut accumsan. Integer mauris nisi, malesuada sed ex ac, pharetra ultricies sem. Phasellus non nulla risus. Suspendisse sodales imperdiet libero eu eleifend. Phasellus maximus fermentum dui, non tristique purus volutpat eget. Integer interdum lobortis risus sed interdum. Pellentesque accumsan mauris ligula, aliquet molestie odio aliquam eu. Aliquam pretium suscipit condimentum. Pellentesque tincidunt fringilla vestibulum. Nullam lacinia sodales convallis. Duis molestie felis velit, eu sollicitudin nisi consequat ut.</p>"},
  {name: 'Sunset Hills', image:'https://farm9.staticflickr.com/8673/15989950903_8185ed97c3.jpg', description:"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla justo turpis, placerat sed felis a, aliquet suscipit elit. Duis pellentesque tincidunt porttitor. Cras condimentum porttitor erat ac porttitor. Fusce pulvinar ligula ut ultricies rutrum. Cras gravida nisi a congue commodo. Phasellus rhoncus euismod eros sit amet aliquam. Praesent diam urna, dictum ac elit at, feugiat venenatis erat. </p> <p> Integer mattis sollicitudin purus ut accumsan. Integer mauris nisi, malesuada sed ex ac, pharetra ultricies sem. Phasellus non nulla risus. Suspendisse sodales imperdiet libero eu eleifend. Phasellus maximus fermentum dui, non tristique purus volutpat eget. Integer interdum lobortis risus sed interdum. Pellentesque accumsan mauris ligula, aliquet molestie odio aliquam eu. Aliquam pretium suscipit condimentum. Pellentesque tincidunt fringilla vestibulum. Nullam lacinia sodales convallis. Duis molestie felis velit, eu sollicitudin nisi consequat ut.</p>"}
];

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Campgrounds removed!");
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                  if(err){
                      console.log(err)
                  } else{
                        console.log("Added campground!");
                        Comment.create({
                            text: "Really pretty campground. No wifi though.",
                            author: "James Bond"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Added comment");
                            }
                        });
                    }
                });
            });
        }
    });
}

module.exports= seedDB;