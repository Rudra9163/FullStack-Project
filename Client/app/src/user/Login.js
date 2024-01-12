// LoginForm.js
import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      remember: false,
    },
    onSubmit: async (values) => {
        try {
          const response = await axios.post('http://localhost:5000/api/login', values);
          console.log('Login API Response:', response.data);
          navigate('/Table');
        } catch (error) {
          console.error('Login API Error:', error);
          if (error.response) {
            console.error('Server responded with:', error.response.data);
            console.error('Status Code:', error.response.status);
          } else if (error.request) {
            console.error('No response received from the server');
          } else {
            console.error('Error setting up the request:', error.message);
          }
        }
      },
      
  });

  return (
    <>
    <Row justify="center" align="middle">
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
      <Form.Item name="remember" valuePropName="checked">
        <Checkbox onChange={formik.handleChange}>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
    <Button onClick={()=>{
navigate('/signup')
    }}>Not Registerd</Button>
        </Col>
    </Row>
   
    </>
  );
};

export default Login;
