import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import {message, Spin, Result, Button } from 'antd';
import { CheckCircleOutlined, LoadingOutlined, CloseCircleOutlined } from '@ant-design/icons';



const VerifyEmail = () => {
  const location = useLocation();
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'failed'

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    let showedAlert = false;        //for display the alert message only one time

    if (token) {
      axiosInstance
        .get(`/api/verify-email?token=${token}`)
        .then((response:any) => {
            if (!showedAlert) {
                message.success(response.data.message);
                setStatus('success');
              }
        })
        .catch((error:any) => {
            if (!showedAlert) {
                message.error('Verification failed. Please try again.');
                setStatus('failed');
              }
        });
    }
    return () => {
        showedAlert = true;
      };
  }, [location]);

  return (
    <div
    style={{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",

    }}
    >
      {status === 'loading' && (
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          tip="Verifying your email..."
        />
      )}
      {status === 'success' && (
        <Result
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          title="Email Verified Successfully!"
          subTitle="Your email has been verified. You can now log in and start using our services."
          extra={<Button type="primary" href="/login">Go to Login</Button>}
        />
      )}
      {status === 'failed' && (
        <Result
          status="error"
          icon={<CloseCircleOutlined />}
          title="Email Verification Failed"
          subTitle="We could not verify your email. Please try again or contact support if the issue persists."
          extra={<Button type="primary" href="/resend-verification">Resend Verification Email</Button>}
        />
      )}
    </div>
  );
};

export default VerifyEmail;
