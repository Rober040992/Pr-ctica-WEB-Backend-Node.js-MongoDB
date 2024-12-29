import mongoose, { Schema } from 'mongoose'

//los modelos de datos (esquemas de MongoDB) para los productos Product.js

//este es el esquema modelo que vamos a usar cada vez que se crea un producto
/*
Define el modelo de producto, con campos como name, price, 
owner (una referencia al usuario que creó el producto) 
y tags (etiquetas para categorizar el producto , restringidas (enum)).
Image(almacena el nombre de la img)
*/
const productSchema = new Schema({
    name: { type: String, unique: true },
    price: { type: Number, min:0.1 },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: {
        type: [String],
        enum: ['work', 'lifestyle', 'motor', 'mobile',]
      },
    Image: String
    
});
//añadimos static method de esquema para la paginacion (Consulta Paginada)
productSchema.statics.list = function(filter, limit, skip) { //es una función que ejecuta una consulta en la base de datos usando el filtro creado.
  const query = Product.find(filter)
  query.limit(limit)
  query.skip(skip)
  return query.exec()
}

const Product = mongoose.model('Product', productSchema);

export default Product;