import mongoose, { Schema } from 'mongoose'

//los modelos de datos (esquemas de MongoDB) para los productos Product.js

//este es el esquema modelo que vamos a usar cada vez que se crea un producto
/*
Define el modelo de producto, con campos como name, price, 
owner (una referencia al usuario que creó el producto) 
y tags (etiquetas para categorizar el producto).
*/
const productSchema = new Schema({
    name: { type: String, unique: true },
    price: { type: Number, min:0.1 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    tag: [String]
});

const Product = mongoose.model('Product', productSchema);

export default Product;