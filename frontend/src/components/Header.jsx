import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartProduct from './CartProduct';
import { AutoComplete } from 'antd';
import { ProductContext } from '../context/productContext';
import FilterCategory from '../components/FilterCategory';

const Header = () => {
  const { products, setSearchTxt } = useContext(ProductContext);

  const onSearch = value => {
    setSearchTxt(value);
  };
  return (
    <header className="header">
      <div className="logoheader">
        <Link to="/">Ecommerce</Link>
      </div>

      {/*BUSQUEDA CON AUTOCOMPLETE*/}
      <div className="search-container">
        <AutoComplete
          placeholder="Search product..."
          options={products.map(product => ({
            value: product.title,
          }))}
          onSearch={onSearch}
          onSelect={onSearch}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          allowClear
        />
        <FilterCategory />
      </div>

      <nav>
        <CartProduct />
      </nav>
    </header>
  );
};

export default Header;
