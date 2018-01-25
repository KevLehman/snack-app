'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Users collection Schema
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

// Snacks collection Schema
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
        type: Number,
        default: 0
    }
});

// Buy log Schema
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

// Price log Schema
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