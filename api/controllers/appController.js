"use strict";

var mongoose = require("mongoose");
var Users = mongoose.model("Users");
var Snacks = mongoose.model("Snacks");
var Log = mongoose.model("Log");
var Log2 = mongoose.model("LogP");
var sortJsonArray = require('sort-json-array');

//anyone can see all snacks
exports.getAllSnacks = function(req, res){
    var orderby = req.query.orderBy;
    Snacks.find({}, function(err, snack){
        if(err) res.send(err);
        res.json(sortJsonArray(snack,"name",orderby));
    });
};

//onlyadmins
exports.postASnack = function(req, res){
    
    var hash = req.headers.authorization;
    hash = hash.replace("Basic ","");
    var nhash = new Buffer(hash,"base64").toString();
    
    var data = nhash.split(":");
    
    Users.findOne({"name":data[0],"pass":data[1]}, function(err,auth){
       if(!auth) {
          res.send(401);
        }
       else{
           if(auth.type != "admin") {res.sendStatus(401);}
           else {
               var snack = new Snacks(req.params);
               snack.save(function(err, snack1){
                if(err) res.send(err);
                    res.json(snack1); 
               });
           }
       }
    });
};

//anyone
exports.getOneSnack = function(req,res){
    Snacks.findOne({"name":req.params.snackId}, function(err,snack){
       if(err) res.send(err);
       res.json(snack) 
    });
};

//admin
exports.changeSnackQuant = function(req,res){
    
    var hash = req.headers.authorization;
    hash = hash.replace("Basic ","");
    var nhash = new Buffer(hash,"base64").toString();
    
    var data = nhash.split(":");
    
    Users.findOne({"name":data[0],"pass":data[1]},function(err,auth){
       if(!auth) {res.send(401);}
       else {
           if(auth.type != "admin"){res.sendStatus(401);}
           else{
               Snacks.findOne({"name":req.params.snackId}, function(err,snack){
                    var oStock = parseInt(req.params.quantity);
                    
                    snack.quant = oStock;
                    
                    snack.save((err, sn) => {
                        if(err) res.send(err);
                        res.json(sn);
                    });
                });
           }
       }
    });
};

//admin
exports.deleteSnack = function(req,res){
    Snacks.remove({name:req.params.snackId},function(err,snack){
        if(err) res.send(err);
        res.json({message:"Snack eliminada"});
    });
};

//admin
exports.changePrice = function(req,res){
    
    var hash = req.headers.authorization;
    hash = hash.replace("Basic ","");
    var nhash = new Buffer(hash,"base64").toString();
    
    var data = nhash.split(":");
    
    Users.findOne({"name":data[0],"pass":data[1]},function(err,auth){
       if(!auth) {
           res.send(401);
        } else {
            if(auth.type !== "admin"){
                res.sendStatus(401);
            } else {
                Snacks.findOne({"name":req.params.snackId}, function(err,snack){
        
                    snack.price = parseFloat(req.params.price);
                    
                    var logo = new Log2();
                    logo.changer = auth.name;
                    logo.snack = req.params.SnackId;
                    logo.price = req.params.price;
                    
                    logo.save((err, lo) => {
                        if(err) res.send(err);
                    });
                    
                    snack.save((err, sn) => {
                        if(err) res.send(err);
                        res.json(sn);
                    });
                }); 
            }
        }
    });   
};

exports.getLog = function(req,res){
    var hash = req.headers.authorization;
    hash = hash.replace("Basic ","");
    var nhash = new Buffer(hash,"base64").toString();
    
    var data = nhash.split(":");
    
    Users.findOne({"name":data[0],"pass":data[1]},function(err,auth){
       if(!auth) res.send(401);
    });

    Log.find({}, function(err, snack){
        if(err) res.send(err);
        res.json(snack);
    });
};

exports.getPriceLog = function(req,res){
    var hash = req.headers.authorization;
    hash = hash.replace("Basic ","");
    var nhash = new Buffer(hash,"base64").toString();
    
    var data = nhash.split(":");
    
    Users.findOne({"name":data[0],"pass":data[1]},function(err,auth){
       if(!auth) res.send(401);
    });

    Log2.find({}, function(err, snack){
        if(err) res.send(err);
        res.json(snack);
    });
};

// logged users
exports.buySnack = function(req,res){
    Snacks.findOne({"name":req.params.snackId}, function(err, buy){
        
        if(parseInt(req.params.quant) <= 0) res.json({message:"Cant buy less than 0!"});
        if(buy.quant < parseInt(req.params.quant)) res.json({message:"We dont have enough!"});
        
        buy.quant = buy.quant - req.params.quant;
        var price = buy.price * req.params.quant;
        
        buy.save((err,b) => {
           if(err) res.send(err); 
        });
        
        var logo = new Log();
        logo.buyer = "Kevin";
        logo.snack = req.params.snackId;
        logo.quant = req.params.quant;
        
        logo.save((err, lo) => {
            if(err) res.send(err);
        });
        
        res.json({
            action:"buy",
            snack:buy.name,
            quantity:req.params.quant,
            total:price
        });
    });
};

exports.getToken = function(req,res){
    res.json(req.headers["authorization"]);
};

exports.createUser = function(req,res){
    var user = new Users();
    
    user.name = req.body.name;
    user.pass = req.body.pass;
    
    user.save((err,us) => {
        if(err) res.send(err);
    });
    
    res.json({message:"User created!"});
};