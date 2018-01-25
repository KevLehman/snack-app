var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("snack");
  var myobj = [
      { name: "kevin", pass: "12345", type:"admin" },
      { name: "zenay", pass: "123456", type: "user"}];
  dbo.collection("customers").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log(" document inserted");
    db.close();
  });
});