import logo from './logo.svg';
import './App.css';
import ListComponent from './Components/ListComponent';
import Footer from './Components/Footer';
import NavBar from './Components/NavBar';
import ShowFile from './Components/ShowFile';
import HomeComponent from './Components/HomeComponent'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListFiles from './Components/Status';
import Upload from './Components/Upload';

import SignUp from './Components/SignUp';
import Login from './Components/Login';



function App() {
  return (
 
    <div>
        <Router>
           
           
                <NavBar></NavBar>
                <div className="container">
                    <Routes>
                        <Route path='/'  element={<HomeComponent />} />
                       
                        <Route path='/status' element={<ListFiles />} />
                        <Route path='/upload' element={<Upload />} />
                        <Route path='/signup' element={<SignUp />} />
                        <Route path='/login' element={<Login/>} />
                    </Routes>
               </div>
               <Footer></Footer>
               
           
        </Router>
      </div>
  );
}

export default App;
