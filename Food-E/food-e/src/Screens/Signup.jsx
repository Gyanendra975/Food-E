import React, { useState } from 'react';
import {Link} from 'react-router-dom';
export default function Signup() {
    const initialState = { name: "", location: "", email: "", password: "" };
    const [credentials, setCredentials] = useState(initialState)
     const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/user/create",{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({name:credentials.name, location:credentials.location, email:credentials.email, password: credentials.password})
        })
        const res = await response.json()
        console.log(res);
        alert("User Created");
       
    }
    const onChange = (event) =>{
        setCredentials({...credentials, [event.target.name] : event.target.value})
    }

    const handleLocation = () =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                async(location) =>{
                    const {latitude, longitude} = location.coords;

                    try {
                        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=0d74a7dd1ea7436699eaca01b49a7717`);
                        const data = await response.json();
                        console.log("data: ", data);
                        const formattedAddress = data.results[0].formatted;
                        console.log("add: ",formattedAddress)
                        setCredentials(prev => ({ ...prev, location: formattedAddress }));
                    } catch (error) {
                        console.log(error);
                    }
                }
            )
        }
    }

    return (
        <>
            <div>
                <div className="container" style={{border:"2px solid", borderRadius:'10px', borderColor:'grey' ,marginTop:"70px", width:'50%', height:'70%', alignItems:'center', padding:'40px'}}>
                    <h2 className="my-4" style={{marginLeft:'190px', color:'grey'}}>Signup Form</h2>
                    <form onSubmit={handleSubmit} style={{width:'50%', marginLeft:'150px', marginTop:'50px'}}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input type="text" className="form-control" id="location" name="location" value={credentials.location} onChange={onChange} onFocus={handleLocation}  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required />
                        </div>
                        <button type="submit" className="btn btn-danger mt-3">Sign Up</button>
                        <Link  className="btn btn-success mt-3" style={{marginLeft:'20px'}} to ="/">Already a user</Link>
                    </form>
                </div>
            </div>
        </>

    )
}
