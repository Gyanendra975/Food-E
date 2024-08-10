import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const email = localStorage.getItem("userEmail"); // Replace with the dynamic email as needed

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/myorders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [email]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
        <div>
            <Navbar/>
        </div>
        <div className='container mt-3 mb-5'>
            <h4>My Orders</h4>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Size</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>{order.qty}</td>
                            <td>{order.size}</td>
                            <td>{order.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div>
        <Footer/>
        </div>
  
    </>
    );
};

export default Orders;
