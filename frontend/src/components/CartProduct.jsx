import React, { useState } from 'react';
import { Button, Drawer, message, Modal } from 'antd';
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import '../styles/product.css';
import { useCart } from '../context/CartContext';
import { Table, Input } from 'antd';
import '../styles/cart.css';

import ClientForm from './ClientForm';

const CartProduct = () => {
  const { dispatch, getCart, total } = useCart();
  const [open, setOpen] = useState(false);
  const [openDet, setOpenDet] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCantidad = (e, record) => {
    const newQuantity = Number(e.target.value);
    dispatch({
      type: 'ADD_CART',
      payload: {
        id: record.id,
        quantity: newQuantity,
      },
    });
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'product', // Clave única para la columna
      render: (text, record) => (
        <article>
          <img
            src={record.thumbnail}
            alt=""
            style={{ width: '5rem', height: '5rem' }}
          />
          <h2 className="cart-h">{record.title}</h2>
        </article>
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity', // Clave única para la columna
      render: (text, record) => (
        <article className="cart-quantity">
          <Input
            type="number"
            min={0}
            max={999}
            value={record.quantity}
            onChange={e => handleCantidad(e, record)}
          />
          <DeleteOutlined
            className="cart-icon"
            onClick={() =>
              dispatch({ type: 'REMOVE_ITEM_CART', payload: record.id })
            }
            style={{ fontSize: '2rem' }}
          />
        </article>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price', // Clave única para la columna
      render: price => (
        <h1 className="cart-h" style={{ padding: '0.5rem' }}>
          ${price}
        </h1>
      ),
    },
  ];

  const handleOk = () => {
    dispatch({ type: 'CLEAR_CART' });
    setIsModalOpen(false);
    onClose();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onConfirm = () => {
    if (getCart().length === 0) {
      return message.warning('Cart is empty');
    }

    setOpenDet(true);
  };

  const handleClear = () => {
    if (getCart().length === 0) {
      return message.warning('Cart is empty');
    }
    setIsModalOpen(true);
  };

  return (
    <div className="cart-container">
      <article className="cartIconContainer">
        <ShoppingCartOutlined onClick={showDrawer} className="cartIcon" />
        <label>{getCart().length}</label>
      </article>
      <Drawer title="Cart Products" width={600} onClose={onClose} open={open}>
        <Table
          columns={columns}
          scroll={{ y: '27rem' }}
          dataSource={getCart()}
          rowKey="id"
          pagination={false}
        />
        <h2>Total: ${total}</h2>
        <section className="cart-btn">
          <Button
            type="default"
            className="ant-btn2"
            icon={<DeleteOutlined />}
            onClick={handleClear}
          >
            Clear Cart
          </Button>

          <Button onClick={onConfirm} icon={<CheckOutlined />} type="primary">
            Confirm Cart
          </Button>
        </section>
        <Modal
          title="Warning"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Are you sure you want to clear the cart?</p>
        </Modal>

        <ClientForm showValue={openDet} setOpenDet={setOpenDet} />
      </Drawer>
    </div>
  );
};
export default CartProduct;
