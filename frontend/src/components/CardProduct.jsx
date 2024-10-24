import { Card, Input } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import '../styles/product.css';
import { useCart } from '../context/CartContext';

export default function CardProduct({ product }) {
  const { cart, dispatch } = useCart();

  // Encuentra la cantidad actual del producto en el carrito
  const existingItem = cart.items.find(item => item.id === product.id);
  const cantidad = existingItem ? existingItem.quantity : 0; // Si existe, toma la cantidad, de lo contrario, 0

  const handleAddToCart = newCantidad => {
    dispatch({
      type: 'ADD_CART',
      payload: {
        ...product,
        quantity: Number(newCantidad),
      },
    });
  };

  const handleCantidadChange = value => {
    if (value >= 0) {
      handleAddToCart(value);
    }
  };

  return (
    <Card
      hoverable
      className="card"
      cover={<img className="card-img" alt="example" src={product.thumbnail} />}
    >
      <div>
        <h1>{product.title}</h1>
        <h2>${product.price}</h2>
      </div>

      <section className="cant-container">
        <MinusOutlined
          className="cantButton"
          onClick={() => handleCantidadChange(cantidad > 0 ? cantidad - 1 : 0)}
        />
        <Input
          type="number"
          min={0}
          max={999}
          value={cantidad}
          onChange={e => handleCantidadChange(Number(e.target.value))}
        />
        <PlusOutlined
          className="cantButton"
          onClick={() => handleCantidadChange(cantidad + 1)}
        />
      </section>
    </Card>
  );
}
