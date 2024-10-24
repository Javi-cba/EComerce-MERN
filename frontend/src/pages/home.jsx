import React, { useContext, useEffect, useState } from 'react';
import CardProduct from '../components/CardProduct';
import '../styles/product.css';
import { ProductContext } from '../context/productContext';
import { Spin, Pagination } from 'antd';

export default function Home() {
  const { products, loading } = useContext(ProductContext);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Productos por página

  // Actualiza los productos de la página actual
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  useEffect(() => {
    // Reinicia a la página 1 cuando los productos cambien (es decir, cuando se aplica un filtro)
    setCurrentPage(1);
  }, [products]);

  return (
    <section>
      {loading ? (
        <Spin size="large" style={{ width: '100%' }} className="custom-spin" />
      ) : (
        <div className="container-home">
          {/* Contenedor de productos */}
          <section className="products-container">
            {currentProducts.map(product => (
              <CardProduct key={product.id} product={product} />
            ))}
          </section>
          {products.length > 10 && (
            <Pagination
              current={currentPage}
              total={products.length}
              pageSize={productsPerPage}
              onChange={page => setCurrentPage(page)}
              style={{ padding: '1rem' }}
            />
          )}
        </div>
      )}
    </section>
  );
}
