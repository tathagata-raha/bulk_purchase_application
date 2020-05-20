const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productcSchema = new Schema({
  product_name: { type: String, required: true },
  productv_id: {type:String, required:true},
  vendor:{ type: String, required: true },
  price: { type: Number, required: true },
  quantity_ordered: { type: Number, required: true },
  customer:{type: String, required: true },
  state: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String}
}, {
  timestamps: true,
});

const Productc = mongoose.model('Productc', productcSchema);

module.exports = Productc;