const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userdata = new Schema({
  username: { type: String},
  class: { type: String}
}, {
  timestamps: true,
});

const Userdata = mongoose.model('Userdata', userdata);

module.exports = Userdata;