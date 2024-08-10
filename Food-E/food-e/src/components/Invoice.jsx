import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Invoice() {
    const location = useLocation();
    const cartItem = location.state?.cartItems || [];
    const getTotalPrice = () => {
        return cartItem.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
    };
    const userName = localStorage.getItem("userName");
    const date = new Date().toDateString();
    return (
        <>
            <div className='conatainer' style={{display:"flex", justifyContent:'center'}}>
                <div className="card mt-4" style={{width:"45%"}}>
                    <div className="card-body mx-4">
                        <div className="container">
                            <p className="my-5" style={{fontSize: "30px", marginLeft:'80px'}}>Thank for your purchase</p>
                            <div className="row">
                                <ul className="list-unstyled">
                                    <li className="text-muted text-black">{userName}</li>
                                    <li className="text-muted mt-1"><span className="text-muted text-black">Invoice</span>123</li>
                                    <li className="text-muted text-black">{date}</li>
                                </ul>
                                <hr />
                                </div>
                                {cartItem.map((item, index)=>(
                                    <div className="row">
                                <div className="col-xl-10">
                                    <p>{item.name}</p>
                                </div>
                                <div className="col-xl-2">
                                    <p className="float-end">{item.price}
                                    </p>
                                </div>
                                <hr />
                            </div>                                    
                        ))}
                            <div className="row text-black">

                                <div className="col-xl-12">
                                    <p className="float-end fw-bold text-muted text-black">Total:{getTotalPrice()}
                                    </p>
                                </div>
                                <hr style={{border: "2px solid black"}} />
                            </div>
                            <div className="text-center" style= {{marginTop: "90px;"}}>
                                <button type='button' className='btn btn-danger' onClick={()=> window.print()}>Print</button>
                                <p className='mt-2'> Enjoy your meal</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <style>
                {`
                @media print{
                .btn-danger{
                display : none
                }
                    .card {
                        width: 100% !important; /* Ensure the width is consistent for print */
                        margin: 0 !important; /* Remove any margin */
                    }
                    .container {
                        width: 100% !important; /* Ensure the container width is consistent for print */
                        margin: 0 !important; /* Remove any margin */
                    }
            }
                `}
            </style>
        </>

    )
}
