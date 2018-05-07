const express       =   require('express'),
      bodyParser    =   require("body-parser"),
      mongoose      =   require('mongoose'),
      models        =   require("../../models/"),
      user          =   models.userModel,
      passport      =   require("passport");

module.exports = function(app) {

    // Get Register Page
    app.get("/register", function(req, res) {
        res.render("register",{user: req.user});   
    });

        // Register New User
        app.post("/register", function(req, res) {
            let newUser = new user({username:req.body.username});
            user.register(newUser,req.body.password)
            .then((user)=>{
                res.redirect("/");
            })
            .catch((err)=>{
                console.log(err);
                return res.render("register"); 
            })
        });

    // Get Login Page
    app.get("/login", function(req, res) {
        res.render("login");   
    });

        // Login
        app.post("/login", passport.authenticate("local", {
                successRedirect: "/", 
                failureRedirect: "/login"
            })
            , function(req, res) {
        });

    //Logout
    app.get("/logout", function(req, res) {
        req.logout();
        res.redirect("/");   
    });

}