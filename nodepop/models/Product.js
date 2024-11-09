// models/Product.js
import mongoose, { Schema } from 'mongoose'
//create a schema model
const productSchema = new Schema({
    name: { type: String, unique: true },
    price: { type: Number, min:0.1 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: [String]
});

const Product = mongoose.model('Product', productSchema);

export default Product;