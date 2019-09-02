var mongoose = require("mongoose"),
    Comment  = require("./models/comment"),
    Campground = require("./models/campground");


var data = [
  {
    name: "Stars",
   image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=349&q=80",
   description: "Relax under the stars, drink a cup of coffe and listen to Beethoven."
 },
 {
    name: "Forest",
    image: "https://images.unsplash.com/photo-1540329957110-b87b06f5718e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
    description: "If you love forests this is better for you."
 },
 {
   name: "Sunset Campground",
   image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=753&q=80",
   description: "Gather with your family and friends have a nice time far from internet and city"
 }
]

function seedDB(){
  //remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campgrounds");

    //add a few campgrounds
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err);
        } else{
          console.log("Added a campground");
          //add a few comments
          Comment.create({
            text: "This place is great, I love it.",
            author: "Ahmed"
          }, function(err, comment){
            if(err){
              console.log(err);
            } else{
              campground.comments.push(comment);
              campground.save();
              console.log("created new comment");
            }
          });
        }
      });
    });
  });
}

module.exports = seedDB;
