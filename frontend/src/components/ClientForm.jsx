import { useState } from 'react';
import { Form, Input, Modal, notification } from 'antd';
import { useCart } from '../context/CartContext';
import { createOrder } from '../service/orderService';

const ClientForm = ({ showValue, setOpenDet }) => {
  const { getCart, dispatch } = useCart();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const openNotification = (type, title, description) => {
    notification[type]({
      message: title,
      description: description,
    });
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenDet(false); // Cerrar el modal
  };

  const onFinish = async dataCli => {
    setConfirmLoading(true);
    console.log('Success:', dataCli);
    const orderNew = {
      ...dataCli,
      orderDetails: getCart(), // Enviamos todo el carrito y el BackEnd se encarga de usar lo q necesite
    };

    const resp = await createOrder(orderNew);

    if (resp) {
      openNotification('success', 'Order created', resp.message);
      dispatch({ type: 'CLEAR_CART' });
      setOpenDet(false); // Cerrar el modal al confirmar
      form.resetFields();
      setConfirmLoading(false);
    } else {
      openNotification('error', 'Error', 'Error creating order');
    }

    setConfirmLoading(false);
  };

  return (
    <>
      <Modal
        title="Additional data "
        open={showValue} // Mostrar el modal según el valor de showValue
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Confirm Order"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Name"
            name="clientName"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Direction"
            name="direction"
            rules={[
              { required: true, message: 'Please enter your direction!' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ClientForm;
