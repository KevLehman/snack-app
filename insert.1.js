var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("snack");
  var myobj = [
      { name: "Papitas", precio: "10", cant:"10000", likes: "1"},
      { name: "Frutilla", precio: "10", cant: "10000", likes:"2"}];
  dbo.collection("snacks").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log(" document inserted");
    db.close();
  });
});