import { createContext, useEffect, useState } from 'react';
import { getProducts } from '../service/productService';

const ProductContext = createContext();

const getCategoryNames = products => {
  // Set Solo se permite un único valor por cada clave
  const categorySet = new Set();

  products.forEach(product => {
    const { category } = product;
    categorySet.add(category); // Agrega el nombre de la categoría al Set
  });

  return Array.from(categorySet); // Convierte el Set a un arreglo
};
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTxt, setSearchTxt] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const [loading, setLoading] = useState(true);

  // Efecto para cargar productos al montar el componente
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);

      // Agrupa los nombres de categorías
      const groupedCategories = getCategoryNames(fetchedProducts);
      setCategories(groupedCategories);
    };

    fetchProducts();

    // Simula un tiempo de carga
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const filterProducts = () => {
    return products.filter(product => {
      const filterTitle = product.title
        .toLowerCase()
        .includes(searchTxt.toLowerCase());
      const filterCategory =
        categorySelected === '' ? true : product.category === categorySelected;

      return filterTitle && filterCategory;
    });
  };

  const handleCategorySelect = category => {
    // Si la categoría seleccionada es la misma que la actual, limpiamos el filtro
    if (categorySelected === category) {
      setCategorySelected(''); // Limpiar el filtro
    } else {
      setCategorySelected(category); // Establecer la nueva categoría
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products: filterProducts(),
        searchTxt,
        setSearchTxt,
        categorySelected,
        handleCategorySelect,
        categories,
        loading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext };
