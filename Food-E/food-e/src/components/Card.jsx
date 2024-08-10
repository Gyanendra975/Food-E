import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  let priceOption = Object.keys(options) || {};

  const [size, setSize] = useState(priceOption[0] || "");
  const [qty, setQty] = useState(1);
  const [finalPrice, setFinalPrice] = useState(0);
  const [showAlert, setShowAlert] = useState(false); // State for showing alert

  useEffect(() => {
    if (size && options[size]) {
      setFinalPrice(options[size] * qty);
    }
  }, [size, qty]);

  const handleAddToCart = () => {
    const existingItem = data.find(item => item.id === props.foodItem._id && item.size === size);
    if (existingItem) {
      dispatch({ type: 'UPDATE', id: props.foodItem._id, qty: qty, size: size, price: finalPrice });
    } else {
      dispatch({ type: 'ADD', id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
    }
    
    setShowAlert(true); // Show alert
    setTimeout(() => setShowAlert(false), 2000); // Hide alert after 2 seconds
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      <div>
        <div className="card mt-3" style={{ width: "300px", maxHeight: "400px" }}>
          <img className="card-img-top" src={props.foodItem.img} style={{ height: '200px', objectFit: "fill" }} alt={props.foodItem.name} />
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">{truncateText(props.foodItem.description, 25)}</p>
          <div className='container w-100'>
            <select className='m-2 h-100 bg-danger rounded' value={qty} onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
            <select className='m-2 h-100 bg-danger rounded' value={size} onChange={(e) => setSize(e.target.value)}>
              {
                priceOption.map((data) => {
                  return (
                    <option key={data} value={data}>{data}</option>
                  )
                })
              }
            </select>
            <div className='d-inline h-100 fs-6 m-4'>
              {finalPrice}Rs/-
            </div>
            <hr />
            <Link className="btn bg-danger text-white" to="" style={{ marginTop: "-25px", marginLeft: '55px' }} onClick={handleAddToCart}>Add to Cart</Link>
          </div>
        </div>
        {showAlert && ( 
          <div className="alert alert-success" role="alert">
           { `${props.foodItem.name} added to cart successfully!`}
          </div>
        )}
      </div>
    </>
  );
}
