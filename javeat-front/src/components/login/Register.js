import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [phone,setPhone] = useState('');
  const [positionX,setPositionX] = useState(0);
  const [positionY,setPositionY] = useState(0);
  const [owner,setOwner] = useState(false);

  const [dat, setData] = useState(
    {
        mail,
        password,
        phone,
        positionX: Number(positionX),
        positionY: Number(positionY),
        owner
    }
  )

  let navigate = useNavigate();

  function changeInOwner() 
  {

    var checkbox = document.getElementById("flexSwitchCheckDefault");
  
    var isOwner = checkbox.checked;
    setOwner(isOwner);
    
  }
  
  const handleRegistration = async (e) => 
  {
    e.preventDefault();
    try {
      const response = await axios.post('/user/register', 
      {
        mail,
        password,
        phone,
        positionX: Number(positionX),
        positionY: Number(positionY),
        owner
      });
        console.log('Registration successful', response.data);
        navigate('/user/login');
    } catch (error) {
        console.error('Registration failed', error);
    }
  };

  return (
    <body style={{ minHeight: '150vh', backgroundImage: "url('/3.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}}>
      <div className="container d-flex justify-content-center align-items-center" >
        <form onSubmit={handleRegistration}><br/><br/><br/><br/>
                <h2><strong>Crea un Account</strong></h2>
                <br/>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input className="form-control" type="text"placeholder="Mail" value={mail} onChange={(e) => setMail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Phone Number</label>
                    <input className="form-control" type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Position X</label>
                    <input className="form-control" type="number" placeholder="Position X" value={positionX} onChange={(e) => setPositionX(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Position Y</label>
                    <input className="form-control" type="number" placeholder="Position Y" value={positionY} onChange={(e) => setPositionY(e.target.value)}/>
                </div>
                <div className="form-check form-switch">
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault"><strong>Sei un ristoratore?</strong></label>
                  <input onClick={changeInOwner} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                </div>
                <div className=''>
                <button onClick={handleRegistration} style={{backgroundColor: "#2EC4B6", color: 'white'}} className="btn mt-3 px-5"><strong>Register</strong></button>   
                </div>
                
        </form>
        </div>
        </body>
  
    
        
  );
};

export default Register;