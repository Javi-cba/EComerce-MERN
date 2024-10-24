const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, required: false },
  rating: { type: Number, required: false },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [{ type: String }], // Array de URLs de imágenes
  weight: { type: Number, required: false }, // Peso opcional
  dimensions: {
    width: { type: Number, required: false }, // Ancho opcional
    height: { type: Number, required: false }, // Alto opcional
    depth: { type: Number, required: false }, // Profundidad opcional
  },
  reviews: [
    {
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      date: { type: Date, required: true },
      reviewerName: { type: String, required: true },
      reviewerEmail: { type: String, required: true },
    },
  ],
});

// Crear el modelo de producto
const productModel = mongoose.model('Product', productSchema);

module.exports = productModel; // Exportar con CommonJS
