
import './App.css';

import Footer from './Components/global/Footer';
import NavBar from './Components/global/NavBar';
import ShowFile from './Components/User/traitementFichier/ViewHeader';
import HomeComponent from './Components/HomeComponent';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import ListFiles from './Components/User/traitementFichier/Status';
import Upload from './Components/User/traitementFichier/Upload';

import SignUp from './Components/authentification/SignUp';
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



function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
         
          const roleResponse = await axios.get(`http://localhost:8081/api/v1/auth/user-role`, {
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
                    
                    <Route path='/Login' element={<Login/>} />
                    {userRole === 'USER' && (
                      <>
                    <Route path='/Upload' element={<Upload />} />
                    <Route path='/status' element={<ListFiles />} />
                    <Route path='/ViewDetail/:id' element={<ViewDetail></ViewDetail>} />
                    <Route path='/ViewHeader/:id' element={<ViewHeader></ViewHeader> } />
                        
                    <Route path='/ViewFooter/:id' element={<ViewFooter></ViewFooter>} />
                    </>
                    )}
                    {userRole === 'ADMIN' && (
                    
                        <Route path='/Student' element={<Student></Student>} />
                    )}
                     <Route path="/" element={<Navigate to="/" />} />
                   
                  
                </Routes>
           </div>
           
           
       
    </Router>
  </div>
 
         );
}

export default App;




{/* <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar}/>
            <Routes>
                        
                        <Route path='/' element={<Upload />} />
                        <Route path='/status' element={<ListFiles />} />
                        <Route path='/upload' element={<Upload />} />
                        <Route path='/calendar' element={<Calendar />} />
                        <Route path='/ViewHeader/:id' element={<ViewHeader></ViewHeader>} />
                        <Route path='/ViewDetail/:id' element={<ViewDetail></ViewDetail>} />
                        <Route path='/ViewFooter/:id' element={<ViewFooter></ViewFooter>} />
                        <Route path='/Student' element={<Student></Student>} />
                        
                        
                    </Routes>
            
          </main>
          
        </div>
        </ThemeProvider>
        </ColorModeContext.Provider> */}





     /*    import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sidebar, Table } from "./components";
import Home from "./Pages/Home/Home";
import Foods from "./Pages/Foods/Food";
import Messages from "./Pages/Messages/Messages";
import Settings from "./Pages/Settings/Settings";
import "./App.css";
import {
  dispatchLogin,
  fetchUser,
  dispatchGetUser,
} from "./redux/actions/authAction";

import Header from "./components/header/Header";
import Body from "./components/body/Body";

import axios from "axios";
import Profile from "./components/body/profile/Profile";
import UserProfile from "./components/body/profile/UserProfile";
import Contact from "./components/Contact/Contact";
import Footer from "./components/body/footer/footer";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);

        dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());
        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <div>
      <Router>
        <div className="App">
          <Header />
          <Body />
        </div>
      </Router>
      {auth.isLogged ? (
        auth.isAdmin ? (
          <>
            <Router>
              <div className="App">
                <Sidebar />
                <Route path="/home" element={<Home />}>
                  <Home />
                </Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/contacts" element={<Contact />}>
                  <Contact />
                </Route>
                <Route path="/produits" element={<Settings />}></Route>
                <Route path="/info" element={<UserProfile />}>
                  <UserProfile />
                </Route>
                <Route path="/paramètres" element={<Foods />}></Route>
              </div>
            </Router>
          </>
        ) : (
          <Router>
            <div className="App"></div>
          </Router>
        )
      ) : null}
    </div>
  );
}

export default App; */



/* 

const userRole = 'USER';
  return (
   
    <div>
         <div>
            
            <>
            <Routes>
                  <Route path='/' element={< Login/>} />
                  <Route path='/Register' element={< Register/>} />
              
                  </Routes>
               </>
        
        </div>   
       {userRole === 'admin' && (
          <>
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/dashbord" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </>
        )}
          {userRole === 'USER' && (
          <>
           
           
        
                <div className="container">
               <NavBar></NavBar>
               <Routes>
               <Route path='/home'  element={<HomeComponent />} />
               <Route path='/upload' element={< UploadComponent/>} />
                      
                      <Route path='/list/showcrypted/:id' element={< ShowFileCrypted/>} />
                      <Route path='/list/showdecrypted/:id' element={< ShowFileDeCrypted/>} />
                     
                      <Route path='/list/Split/:id' element={< FileSplited/>} />
                    
                      <Route path='/list/uploadFile' element={< TableauFile/>} />
                      
                      <Route path='/ADDConsultation' element={< Consultation/>} />
                      <Route path='/listConsultation' element={< ConsultationList/>} />
                      <Route path='/updateConsultation/:id' element={< UpdateConsultation/>} />
                      <Route path='/getone/:id' element={< ConsultationDetails/>} />
                      <Route path='/ADDfacture' element={< Facture/>} />
                      <Route path='/listFacture' element={< FactureList/>} />
                      <Route path='/updateFacture/:id' element={< UpdateFacture/>} />
                      <Route path='/getoneFacture/:id' element={< FactureDetails/>} />
                    
                 <Route path='/list/:id' element={< Tabledemande/>} />
                 
               </Routes>
               <Footer></Footer>
                   
                  
                   </div>
                   </>
        )}
                  
                
          </div>
          
          
        
      );
    } */