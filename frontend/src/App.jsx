import './styles/App.css';
import Header from './components/Header';
import Home from './pages/home';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/productContext';

function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <>
          <Header />
          <Home />
        </>
      </CartProvider>
    </ProductProvider>
  );
}

export default App;
