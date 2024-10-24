import axios from 'axios';
const URLAPI = import.meta.env.VITE_API_URL;

export const createOrder = async data => {
  try {
    const resp = await axios.post(`${URLAPI}/api/order/create`, data);
    return (
      resp.status === 201 && {
        message: 'Order created successfully!',
        data: resp.data,
      }
    );
  } catch (error) {
    console.log(`Error al crear el pedido: ${error}`);
    return null;
  }
};
