
import './App.css';

import Footer from './Components/global/Footer';
import NavBar from './Components/global/NavBar';
import ShowFile from './Components/User/traitementFichier/ViewHeader';
import HomeComponent from './Components/HomeComponent';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import ListFiles from './Components/User/traitementFichier/Status';
import Upload from './Components/User/traitementFichier/Upload';


import Login from './Components/authentification/Login';
import SideBar from './Components/global/SideBar';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from './Components/global/Topbar';
import Calendar from './Components/Calendar';
import React, { useEffect, useState } from 'react';







import ViewDetail from './Components/User/traitementFichier/ViewDetail';
import ViewFooter from './Components/User/traitementFichier/ViewFooter';
import ViewHeader from './Components/User/traitementFichier/ViewHeader';
import Student from './Components/Student';
import axios from 'axios';
import Form from './Components/Admin/Form';
import Team from './Components/Admin/Team';
import FAQ from './Components/Admin/Faq';
import CalendarAdmin from './Components/Admin/CalendarAdmin';
import CalendarUser from './Components/User/CalendarUser';
import ViewFiles from './Components/Admin/ViewFiles';



function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
         
          const roleResponse = await axios.get(`http://localhost:8080/api/v1/auth/user-role`, {
            headers: { Authorization: `${token}` }
          });
          const role = roleResponse.data;
          
          setUserRole(role);
          console.log(role);
        }else {
          // Gérer le cas où le token est manquant
          setUserRole(null);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du rôle de l\'utilisateur:', error);
        // Gérez l'erreur ici
        setUserRole(null);
        
      }
    };

    fetchUserRole();
  }, []);

  

  return (
    <div>
    <Router>
       
       
            
            <div className="container">
                <Routes>
                    <Route path='/'  element={<HomeComponent />} />
                    
                    
                    
                  
                    <Route path='/faq'  element={<FAQ></FAQ> } />
                    <Route path='/Login' element={<Login/>} />
                    
                   
                    
                    {userRole === 'USER' && (
                      <>
                      <Route path='/Upload' element={<Upload />} />
                    
                    <Route path='/status' element={<ListFiles />} />
                    <Route path='/ViewDetail/:id' element={<ViewDetail></ViewDetail>} />
                    <Route path='/ViewHeader/:id' element={<ViewHeader></ViewHeader> } />
                    <Route path='/calendarUser' element={<CalendarUser></CalendarUser> } /> 
                    <Route path='/ViewFooter/:id' element={<ViewFooter></ViewFooter>} />
                    </>
                    )}
                    {userRole === 'ADMIN' && (
                    
                        <>
                        <Route path='/calendarAdmin' element={<CalendarAdmin></CalendarAdmin> } />
                        <Route path='/form'  element={<Form></Form> } />
                        <Route path='/team'  element={<Team></Team>} />
                        <Route path='/Top'  element={<Topbar></Topbar>} />
                        <Route path='/allFiles'  element={<ViewFiles></ViewFiles>} />
                        </>
                    )}
                     <Route path="/" element={<Navigate to="/" />} />
                   
                  
                </Routes>
           </div>
           
           
       
    </Router>
  </div>
 
         );
}

export default App;




