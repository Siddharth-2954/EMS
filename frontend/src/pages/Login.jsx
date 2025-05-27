import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Form, Input } from 'antd';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginHandler = async (values) => {
        setLoading(true);
        try {
            // const { data } = await axios.post('http://localhost:4000/api/v1/login', values);
            const { data } = await axios.post('https://expense-management-backend-lrn5.onrender.com/api/v1/login', values);
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
        } finally {
            setLoading(false);
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
                backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div style={{
                width: '450px',
                padding: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                textAlign: 'center',
            }}>
                <h1 style={{ 
                    marginBottom: '30px', 
                    color: '#333',
                    fontSize: '28px',
                    fontWeight: '600',
                }}>Welcome Back</h1>
                
                {error && (
                    <div style={{ 
                        color: '#e74c3c', 
                        backgroundColor: '#ffeaea', 
                        padding: '12px', 
                        borderRadius: '8px',
                        marginBottom: '20px',
                        fontSize: '14px',
                    }}>
                        {error}
                    </div>
                )}
                
                <Form
                    className='form'
                    onFinish={loginHandler}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Email</span>}
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }]}
                        style={{ marginBottom: '24px', textAlign: 'left' }}
                    >
                        <Input 
                            type='email' 
                            style={{ 
                                borderRadius: '8px', 
                                padding: '12px 16px', 
                                fontSize: '16px',
                                border: '1px solid #ddd',
                            }} 
                            placeholder="Enter your email"
                        />
                    </Form.Item>
                    
                    <Form.Item
                        label={<span style={{ fontSize: '16px', fontWeight: '500' }}>Password</span>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                        style={{ marginBottom: '30px', textAlign: 'left' }}
                    >
                        <Input 
                            type='password' 
                            style={{ 
                                borderRadius: '8px', 
                                padding: '12px 16px', 
                                fontSize: '16px',
                                border: '1px solid #ddd',
                            }} 
                            placeholder="Enter your password"
                        />
                    </Form.Item>                   
                    <button
                        type='submit'
                        disabled={loading}
                        style={{
                            width: '100%',
                            backgroundColor: '#764ba2',
                            color: 'white',
                            border: 'none',
                            padding: '14px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 6px rgba(118, 75, 162, 0.2)',
                            opacity: loading ? 0.7 : 1,
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#8a5bb5'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#764ba2'}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                    
                    <div style={{ marginTop: '24px', fontSize: '14px', color: '#666' }}>
                        Don't have an account? <Link to="/signup" style={{ color: '#764ba2', textDecoration: 'none', fontWeight: '500' }}>Sign up</Link>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;