const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const mongoose = require('mongoose');

// var mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const Schema = mongoose.Schema;

const productvSchema = new Schema({
  product_name: { type: String, required: true },
  vendor:{ type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  quantity_sold: { type: Number, required: true },
  quantity_left: { type: Number, required: true },
  state: { type: String, required: true }
}, { 
  timestamps: true,
});

productvSchema.plugin(mongoose_fuzzy_searching, {fields: ['product_name']});

const Productv = mongoose.model('Productv', productvSchema);
 
module.exports = Productv;