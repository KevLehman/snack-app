'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var users = new Schema({
  name: {
    type: String
  },
  pass: {
    type: String
  },
  type: {
    type: String,
    enum: ['user', 'admin'],
    default: ['user']
  }
});
var snacks = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    quant: {
        type: Number
    },
    likes: {
        type: Number
    }
});
var log = new Schema({
  buyer: {
    type: String
  },
  snack: {
    type: String
  },
  quant: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var priceLog = new Schema({
  changer: {
    type: String
  },
  snack: {
    type: String
  },
  price: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("LogP",priceLog);
module.exports = mongoose.model('Users', users);
module.exports = mongoose.model("Snacks", snacks);
module.exports = mongoose.model("Log", log);