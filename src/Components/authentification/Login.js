import React from 'react'
import axios from 'axios' ;
import { useState} from 'react';
import NavBar from '../global/NavBar';
import cori from '../../source/images/cori.jpg';
import SecFooter from '../global/SecFooter';
import rltq517d from '../../source/images/rltq517d.png';

import Button from '@mui/material/Button';
export default function Login() {
    
    
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
    
      const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
          const response = await axios.post(`http://localhost:8080/api/v1/auth/authenticate`, { email, password });
          const { token } = response.data;
    
          // Stocker le token dans le stockage local (localStorage)
          localStorage.setItem('token', token);
          
        
    
          // Effectuer une requête pour récupérer le rôle de l'utilisateur
          const roleResponse = await axios.get(`http://localhost:8080/api/v1/auth/user-role`, {
            headers: { Authorization: `${token}` }
          });
          const role = roleResponse.data;
          
        

          
    
          // Redirection en fonction du rôle
          if (role === 'USER') {
            window.location.href = '/status';
          } else if (role === 'ADMIN') {
            window.location.href = '/Top';
          }
        } catch (error) {
          setError('Échec de la connexion. Veuillez vérifier vos identifiants.');
        }



        
        
      };
    
    


   

  return (
    <div>
    <NavBar></NavBar>
    <div style={{marginBottom: 30, marginTop:90}}>
    <div className='container'>
        <div className='row'>
        <div className='col-md-9'></div>
        <img src={rltq517d} alt="easylo logo" style={{width:"800px", height:"600px"}} />
            <div className='card col-md-4'>
            <a class="text-center"><img src={cori} alt="easylo logo" width={180} height={180} style={{marginTop:20}} /></a>
               
                
                <div>
                    <form onSubmit={handleLogin}>
                        <br></br>
                        <div className='form-group'>
                            <label>Email Address : </label>
                            <input type="text"  className='form-control'  value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <br></br>
                        <div className='form-group'>
                            <label>Password : </label>
                            <input type="password" className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <br></br>
                        <br></br>
                        <label>
        <input
          type="checkbox"
          checked={''}
          onChange={''}
        />
        Remember Me
        </label>
       <a style={{marginLeft :160}}  href="/">Forgot Password?</a>
                        
      
                       
                        <div class="text-center">
                            <br></br>
                            <br></br>
                      
                        <Button variant="contained" style={{width:'250px'}} type="submit" >LogIn</Button>
                        </div>
                        <br></br>
                         </form>
                </div>

            </div>

        </div>

    </div>
    
</div >
<SecFooter></SecFooter>
</div>
  )
    };



