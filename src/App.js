
import './App.css';

import Footer from './Components/Footer';
import NavBar from './Components/NavBar';
import ShowFile from './Components/ViewHeader';
import HomeComponent from './Components/HomeComponent'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListFiles from './Components/Status';
import Upload from './Components/Upload';

import SignUp from './Components/authentification/SignUp';
import Login from './Components/authentification/Login';
import SideBar from './global/SideBar';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from './global/Topbar';
import Calendar from './Components/Calendar';
import { useState } from "react";

import { Component } from 'react';



import ViewDetail from './Components/ViewDetail';
import ViewFooter from './Components/ViewFooter';
import ViewHeader from './Components/ViewHeader';
import Student from './Components/Student';


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
 
    <ColorModeContext.Provider value={colorMode}>
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
        </ColorModeContext.Provider>
      
    
  );
}

export default App;
{/* <div>
        <Router>
           
           
                <NavBar></NavBar>
                <div className="container">
                    <Routes>
                        <Route path='/'  element={<HomeComponent />} />
                       
                        <Route path='/status' element={<ListFiles />} />
                        <Route path='/upload' element={<Upload />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/side' element={<SideBar/>} />
                    </Routes>
               </div>
               <Footer></Footer>
               
           
        </Router>
      </div>
  );
} */}
