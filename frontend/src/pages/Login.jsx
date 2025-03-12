import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const loginHandler = async (values) => {
        try {
            const { data } = await axios.post('http://localhost:4000/api/v1/login', values);
            alert("Logged in successfully!");
            window.localStorage.setItem("isLoggedIn", true);
            localStorage.setItem('user', JSON.stringify({ ...data.user, password: "" }));
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An unknown error occurred. Please try again.");
            }
            console.error(err);
        }
    }

    return (
        <div
            className="login-container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#f0f0f0', // Fallback background color
            }}
        >
            <Form
                className='form'
                onFinish={loginHandler}
                style={{
                    width: '400px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with opacity
                    borderRadius: '10px',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                }}
            >
                <h1 style={{ marginBottom: '30px', color: '#333' }}>Login Form</h1>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input type='email' style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input type='password' style={{ width: '100%' }} />
                </Form.Item>
                <button
                    type='submit'
                    style={{
                        backgroundColor: '#3a47d5',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        marginTop: '10px',
                    }}
                >
                    Log In
                </button>
            </Form>
        </div>
    )
}

export default Login;
