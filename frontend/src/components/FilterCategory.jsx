import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/productContext';
import { RightOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const FilterCategory = () => {
  const { categorySelected, handleCategorySelect, categories } =
    useContext(ProductContext);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };
  return (
    <div>
      <Button
        icon={<FilterOutlined />}
        onClick={showDrawer}
        className="filter-button"
        style={categorySelected !== '' && { backgroundColor: '#f0a8497a' }}
      ></Button>

      <Drawer
        title=""
        placement="left"
        closable={true}
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={280} // Ancho del Drawer
      >
        <section className="filter-category">
          <h1>Categories</h1>
          {categories.map(category => (
            <div
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={
                categorySelected === category
                  ? 'category-item-selected'
                  : 'filter-category-item'
              }
            >
              <a>{category}</a>
              <RightOutlined />
            </div>
          ))}
        </section>
      </Drawer>
    </div>
  );
};

export default FilterCategory;
