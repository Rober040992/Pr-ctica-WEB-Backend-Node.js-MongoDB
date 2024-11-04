// models/Product.js
import mongoose from 'mongoose';

const productSchema = new Schema({
    name: { type: String, unique: true },
    price: { type: Number, min:0.1 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Product = mongoose.model('Product', productSchema);

export default Product;