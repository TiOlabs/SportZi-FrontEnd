
import React, { useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, message as antMessage } from 'antd';


const { Title } = Typography;


const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { password: string; confirmPassword: string }) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      antMessage.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/reset-password/${token}`, { password });
      antMessage.success(response.data.message);
      navigate('/login');
    } catch (error: any) {
      antMessage.error('Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <Title level={2}>Reset Password</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="password"
          label="New Password"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          rules={[{ required: true, message: 'Please confirm your new password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

};

export default ResetPassword;

