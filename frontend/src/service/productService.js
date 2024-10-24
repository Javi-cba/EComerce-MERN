import axios from 'axios';
const URLAPI = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
  try {
    const response = await axios.get(`${URLAPI}/api/product`);

    return response.data;
  } catch (error) {
    console.log(`ERROR AL OBTENER PRODUCTOS: ${error}`);
    return null;
  }
};
