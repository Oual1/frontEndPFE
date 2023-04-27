import React from 'react'
import axios from 'axios' ;
import { useState} from 'react';
export default function Login() {
    
    const [email,setEmail]=  useState('');
    const [password,setPassword]=  useState('');
    
   
    
    function addUser(){
      axios.post("http://localhost:8080/api/v1/employees",
      {
      emailId:email,
      password: password
      })
.then(function (response) {
console.log(response);
})
.catch(function (error) {
console.log(error);
});}

   

  return (
    <div style={{marginBottom: 100}}>
    <div className='container'>
        <div className='row'>
            
            <div className='card col-md-6 offset-md-3 offset-md-3'>
            <a class="text-center"><img src="./source/images/cori.jpg" alt="easylo logo" width={180} height={180} style={{marginTop:20}} /></a>
                <h3 className='text-center'></h3>
                
                <div className='card-body'>
                    <form onSubmit={(e)=>{e.preventDefault();addUser();}}>
                        
                        <div className='form-group'>
                            <label>Email Address : </label>
                            <input type="text" name='emailId' className='form-control' onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className='form-group'>
                            <label>Password : </label>
                            <input type="text" name='emailId' className='form-control' onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                       
                       
                        <div class="text-center">
                        <a style={{marginTop:20}} class="btn border-0 btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="/">SIGN IN</a>
                        </div>
                        <div class="text-center mt-4 font-weight-light">Don't have an account? <a class="font-weight-bold" style={{color:'#10c98f'}} href="/signup">Create</a></div>
                          </form>
                </div>

            </div>

        </div>

    </div>
    
</div >
  )
  }




