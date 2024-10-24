const mongoose = require('mongoose');

const detallePedidoSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }, // Referencia al producto
  quantity: { type: Number, required: true }, // Cantidad de productos
  price: { type: Number, required: true }, // Precio unitario al momento de la compra
  discount: { type: Number, default: 0, required: false }, // Descuento aplicado al producto (si existe)
  subTotal: { type: Number, required: true }, // Total de la línea (quantity * price)
});

// Crear el modelo de detallePedido
const detallePedidoModel = mongoose.model('DetallePedido', detallePedidoSchema);

module.exports = detallePedidoModel;
