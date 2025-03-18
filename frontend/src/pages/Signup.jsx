import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import axios from 'axios';
// import logo from "../images/bg.jpg"

const Signup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (values) => {
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/api/v1/signup', values);
            navigate('/login');
        } catch (err) {
            console.error("Error occurred while Signing Up:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="signup-container" 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f0f0', // Fallback background color
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backdropFilter: 'blur(8px)', // Blur effect
                WebkitBackdropFilter: 'blur(8px)', // For Safari
            }}
        >
            <Form
                className='form'
                style={{
                    width: '400px',
                    padding: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with opacity
                    borderRadius: '10px',
                    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                }}
                onFinish={submitHandler}
            >
                <h1 style={{ marginBottom: '30px', color: '#333' }}>Register Form</h1>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}
                >
                    <Input className='name' style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please enter your email!' },
                        { type: 'email', message: 'Please enter a valid email address!' }
                    ]}
                >
                    <Input type='email' style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                    <Input type='password' style={{ width: '100%' }} />
                </Form.Item>
                <span style={{ display: 'block', marginTop: '20px', color: '#666' }}>
                    Already Registered? <Link to="/login" style={{ color: '#3a47d5' }}>Login</Link>
                </span>
                <button
                    type='submit'
                    className={loading ? 'submit-btn loading' : 'submit-btn'}
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
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </Form>
        </div>
    );
};

export default Signup;
