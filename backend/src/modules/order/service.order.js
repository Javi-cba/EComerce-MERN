const productModel = require('../../models/product');
const pedidoModel = require('../../models/pedido');
const detallePedidoModel = require('../../models/detallePedido');
const mongoose = require('mongoose');

async function createOrder(dataOrder) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      clientName,
      email,
      direction,
      orderDetails,
      shippingCost, // costo de envío
      paymentMethod, //metodo de pago
    } = dataOrder;

    let totalAmount = 0;

    // cada detalle de pedido con los productID asociados
    const detallePedidoIds = await Promise.all(
      orderDetails.map(async detail => {
        const product = await productModel.findById(detail._id);
        if (!product) {
          throw new Error(`ProductID ${detail._id} no encontrado`);
        }
        const quantity = Number(detail.quantity);
        const price = detail.price;
        const discount = Number(detail.discount) || 0;
        const subTotal = (price - discount) * quantity;

        totalAmount += subTotal; // Suma al total del pedido

        // Crea el detalle de pedido
        const detalle = await detallePedidoModel.create(
          [
            {
              product: detail._id,
              quantity: quantity,
              price: price,
              discount: discount,
              subTotal: subTotal.toFixed(2),
            },
          ],
          { session }
        );

        // Devuelve el ID del detalle creado
        return detalle[0]._id; // Asegúrate de obtener el ID correcto
      })
    );

    const pedido = await pedidoModel.create(
      [
        {
          clientName: clientName,
          email: email,
          direction: direction,
          dateInit: Date.now(),
          status: 'Pending',
          orderDetails: detallePedidoIds,
          total: totalAmount.toFixed(2),
          shippingCost: shippingCost,
          paymentMethod: paymentMethod,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    console.log('Created order successfully');
    return { pedido };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

module.exports = { createOrder };
