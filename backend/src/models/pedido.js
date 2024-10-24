const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  clientName: { type: String, required: true }, // Nombre del cliente
  email: { type: String, required: true }, // Email del cliente
  direction: { type: String, required: true }, // Dirección de envío
  dateInit: { type: Date, default: Date.now }, // Fecha del pedido
  status: { type: String, default: 'Pending', required: true }, // Estado del pedido ('Pending', 'Shipped', etc.)
  orderDetails: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'DetallePedido' },
  ], // Referencia a los detalles del pedido
  total: { type: Number, required: true }, // Importe total del pedido
  shippingCost: { type: Number, required: false }, // Coste de envío
  paymentMethod: { type: String, default: 'Cash' }, // Método de pago (ej: 'Credit Card', 'PayPal')
});

// Crear el modelo de pedido
const pedidoModel = mongoose.model('Pedido', pedidoSchema);

module.exports = pedidoModel;
