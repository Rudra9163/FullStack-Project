import React, { useState, useEffect } from "react";
import { Button, Popconfirm, message, Modal, Form, Input,Row,Col,Table } from "antd";
 // Define the form layout
 const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const CustomModal = ({ visible, onCancel, onUpdate, record }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(record);
  
    return (
      <Modal
        visible={visible}
        title="Update Data"
        onCancel={onCancel}
        onOk={() => {
          form.validateFields().then((values) => {
            onUpdate(values);
            form.resetFields();
          });
        }}
      >
        <Form {...formLayout} form={form}>
          {/* Define your form fields here */}
          <Form.Item label="FirstName" name="FirstName" rules={[{ required: true, message: "Please enter FirstName" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="LastName" name="LastName" rules={[{ required: true, message: "Please enter LastName" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="EmailAdress" name="EmailAdress" rules={[{ required: true, message: "Please enter EmailAdress" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="PhoneNumber" name="PhoneNumber" rules={[{ required: true, message: "Please enter PhoneNumber" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="City" name="City" rules={[{ required: true, message: "Please enter City" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Adress" name="Adress" rules={[{ required: true, message: "Please enter Adress" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  export default CustomModal;