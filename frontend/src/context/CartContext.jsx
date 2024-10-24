import {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react';

const CartContext = createContext();

const CartReducer = (cart, action) => {
  switch (action.type) {
    case 'ADD_CART': {
      const existingItem = cart.items.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        if (action.payload.quantity === 0) {
          // Si la cantidad es 0, eliminamos el item
          return {
            ...cart,
            items: cart.items.filter(item => item.id !== action.payload.id),
          };
        } else {
          // Si el item ya existe y la cantidad es mayor que 0, actualizamos la cantidad
          return {
            ...cart,
            items: cart.items.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: action.payload.quantity }
                : item
            ),
          };
        }
      } else {
        // Pq cuando se cargaba el articulo, la cantidad era 0 y se cargaba el item en mi cart
        if (action.payload.quantity !== 0) {
          // Si el item no existe, lo añadimos
          return {
            ...cart,
            items: [
              ...cart.items,
              { ...action.payload, quantity: action.payload.quantity },
            ],
          };
        }
      }
    }

    case 'REMOVE_ITEM_CART':
      console.log('REMOVE_ITEM_CART, payload:', action.payload);
      return {
        ...cart,
        items: cart.items.filter(item => item.id !== action.payload),
      };

    case 'CLEAR_CART':
      return { items: [], count: 0 }; // Reset cart structure

    default:
      return cart;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(CartReducer, {
    items: [], // Correct initial state structure
    count: 0,
  });

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto
export const useCart = () => {
  const { cart, dispatch } = useContext(CartContext); // Access cart directly
  const [total, setTotal] = useState(0);

  const getCart = () => {
    return cart.items; // Access items from cart
  };

  useEffect(() => {
    const calcularTotal = () => {
      let total = 0;
      cart.items.forEach(item => {
        total += item.price * item.quantity;
      });

      setTotal(total.toFixed(2));
    };

    calcularTotal();
  }, [cart.items]);

  return { cart, dispatch, getCart, total }; // Return correct values
};
