import { useState } from 'react';
import React  from 'react'
import {Link, useNavigate} from 'react-router-dom';
export default function Login() {
  let navigate = useNavigate();
  const initialState = {email: "", password: "" };
    const [credentials, setCredentials] = useState(initialState)
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/user/login",{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({email:credentials.email, password: credentials.password})
        })
        if (!response.ok) {
          const errorRes = await response.json();
          console.error("Login error:", errorRes.errors);
          return; 
      }

      const res = await response.json();
      
    if(res){
        console.log("response", res.user.FullName);
        localStorage.setItem("authToken",res.authToken);
        localStorage.setItem("userEmail",credentials.email);
        localStorage.setItem("userName",res.user.FullName);
        navigate("/");
        
    }
    
      
      
        
       
    }
    const onChange = (event) =>{
        setCredentials({...credentials, [event.target.name] : event.target.value})
    }
  return (
    <>   
    <div>
      <div className="container" style={{border:"2px solid", borderRadius:'10px', borderColor:'grey', marginTop:"70px", width:'50%', height:'70%', alignItems:'center', padding:'50px'}}>
                    <h2 className="my-4" style={{marginLeft:'230px', color:'grey'}}>LogIn</h2>
                    
                    <form onSubmit={handleSubmit} style={{width:'50%', marginLeft:'140px', marginTop:'40px'}}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}  required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required />
                        </div>
                        <button type="submit" className="btn btn-danger mt-3">LogIn</button>
                        <Link  className="btn btn-success mt-3" style={{marginLeft:'20px'}} to ="/user/create">I am a new user</Link>
                    </form>
                </div>
            </div>
        </>

    )
}
  
