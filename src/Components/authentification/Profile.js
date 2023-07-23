import React from 'react'
import axios from 'axios' ;
import { useState,useEffect } from 'react';
import wala from '../../source/images/wala_chaaben.jpg';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import ResponsiveAppBar from '../User/UserNav';
import Button from '@mui/material/Button';
import SecFooter from '../global/SecFooter';
export default function Profile() {
    const [user,setUser]=  useState(null);
    
    const [userName, setUserName] = useState(null);

   
    const fetchUserName = async () => {
        try {
          const token = localStorage.getItem('token');
          
          if (token) {
           
            const roleResponse = await axios.get(`http://localhost:8080/api/v1/auth/user-name`, {
              headers: { Authorization: `${token}` }
            });
            
            
            setUserName(roleResponse.data);
           
            getMedecin(roleResponse.data)
           
          }
          
        } catch (error) {
          console.error('Erreur lors de la récupération du mail de l\'utilisateur:', error);
          // Gérez l'erreur ici
          setUserName(0);
          
        }
       
       getMedecin()
      };
     
     
      
     
  
  
      function getMedecin(id){
        axios.get(`http://localhost:8080/api/v1/auth/User/${id}`).then(
          response =>{
              const filess= response.data;
              setUser(filess)
             
             })
       
       
      }

      console.log(user)
      useEffect(()=>{
         
         fetchUserName();
        },[]
      )
      



  return (
    <div>
        <ResponsiveAppBar></ResponsiveAppBar>
    <div style={{marginTop:"10%"}}>
    <div className='container'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <br></br>
                <h3 className='text-center'>Profil Personnel</h3>
               
              <Box display="flex" justifyContent="center" alignItems="center">
              
               <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={wala}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                  
                />
                
              </Box>
                <div className='card-body'>
                    <form >
                        <div className='form-group'>
                            <label>Nom: </label>
                            <br></br>
                            <input type="text" name='firstName' className='form-control' value={user?.firstname}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Prénom : </label>
                            <br></br>
                            <input type="text" name='lastName' className='form-control' value={user?.lastname}
                              />
                        </div>
                        <div className='form-group'>
                            <label>Adresse Email : </label>
                            <br></br>
                            <input type="text" name='emailId' className='form-control' value={user?.email}
                             />
                        </div>
                        <div className='form-group'>
                            <label>N°Téléphone: </label>
                            <br></br>
                            <input type="text" name='tel' className='form-control' value={user?.phoneNumber }
                            />
                        </div>
                        <div className='form-group'>
                            <label>mot de passe : </label>
                            <br></br>
                            <input type="text" name='password' className='form-control' value={user?.password }
                            />
                        </div>
                        <br></br>
                        <div>
                        <Button variant="contained" style={{marginLeft:"55%", backgroundColor:"#14DFC4"}} type="submit" >Modifier</Button>
                        <Button variant="contained" style={{marginLeft:"5%", backgroundColor:"#C2C3C3"}}  >Annuler</Button>

                              </div>
                    </form>
                </div>

            </div>

        </div>

    </div>
    
</div>
<SecFooter></SecFooter>
</div>
  )
  }