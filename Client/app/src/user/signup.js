// SignupForm.js
import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
        try {
          const response = await axios.post('http://localhost:5000/api/signup', values);
          console.log('Signup API Response:', response.data);
         navigate('/')
        } catch (error) {
          console.error('Signup API Error:', error);
        }
      },
  });

  return (
    <>
    <Row justify="center">
       <Col span={12}>
       <Form onFinish={formik.handleSubmit} initialValues={formik.initialValues}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Sign up
        </Button>
      </Form.Item>
    </Form>
       </Col>
    </Row>
   
    </>
  );
};

export default Signup;
