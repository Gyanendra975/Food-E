import React from 'react';
import { useCart, useDispatchCart } from './ContextReducer';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Cart() {
 const  navigate = useNavigate()
  const cartItems = useCart();
  const dispatch = useDispatchCart();

  const handleDelete = (id, size) => {
    dispatch({ type: 'REMOVE', id, size });
  };

  const handleUpdate = (id, qty, size) => {
    const item = cartItems.find(item => item.id === id && item.size === size);
    if (item) {
      const updatedPrice = (item.price / item.qty) * qty;
      dispatch({ type: 'UPDATE', id, qty: parseInt(qty, 10), size, price: updatedPrice });
    }
  };

  const handleCheckOut = async() =>{
    console.log("clicked");
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:5000/user/orders", {
      method : 'POST',
      headers:{
          'Content-Type' : 'application/json'
      },

      body : JSON.stringify({
        orders : cartItems,
        email : userEmail,
        Order_date : new Date().toDateString()
      })
    })

    if(response.status === 200){
      console.log("Navigating with:", cartItems);
      navigate("/user/invoice", {state: {cartItems}});
      dispatch({type:'DROP'});

      
    }
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    color: 'white'
  };

  const thTdStyle = {
    border: '1px solid #444',
    padding: '8px',
    textAlign: 'left',
  };

  const thStyle = {
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: '#555',
    color: 'white',
  };

  return (
    <div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thTdStyle, ...thStyle }}>Name</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Quantity</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Size</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Price</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{item.name}</td>
              <td style={thTdStyle}>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => handleUpdate(item.id, e.target.value, item.size)}
                  style={{ width: '50px', color: 'black' }}
                />
              </td>
              <td style={thTdStyle}>{item.size}</td>
              <td style={thTdStyle}>{item.price.toFixed(2)}</td>
              <td style={thTdStyle}>
                <button onClick={() => handleDelete(item.id, item.size)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius:'5px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick = {handleCheckOut} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', marginTop:'8px', borderRadius:'5px' }}>CheckOut</button>
    </div>
  );
}
