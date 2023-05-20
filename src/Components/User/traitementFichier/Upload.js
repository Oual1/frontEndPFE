import React, { useState } from 'react';
import axios from 'axios';
import Modal from "react-modal";
import ResponsiveAppBar from '../UserNav';
import { Box } from '@mui/material';
import SecFooter from '../../global/SecFooter';
import backgound1 from '../../../source/images/background1.png';
import AppBar from '@mui/material/AppBar';
Modal.setAppElement('#root');

const Upload = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const[res, setResponse]= useState(null);
  

  const handleSubmit = async() => {
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/files/uploads",
        data: formData,
        
        headers: { "Content-Type": "multipart/form-data" },
      }
      );
      setResponse(response.data); 
      
      setUploadSuccess(true);
      setModalIsOpen(true);
      
    } catch(error) {
      console.log('error uploading file: ',error)
    }
  }
  
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }
  const closeModal = () => {
    setModalIsOpen(false);
    setUploadSuccess(false);
  };


  const segregateFile=async(res)=>{
    try {
      await axios.get(`http://localhost:8080/files/file-seg/${res}`).then(resp =>{
        
      });
      await axios.get(`http://localhost:8080/headers/header-seg/${res}`).then(re =>{
        
      });
      await axios.get(`http://localhost:8080/details/detail-seg/${res}`).then(response =>{
        
    });
      
      await axios.get(`http://localhost:8080/details/attestations/${res}`).then(res=>{
        
      });
      await axios.get(`http://localhost:8080/details/errorMsg/${res}`).then(res=>{
        
      });
    
      
      
      
    } catch (error) {
      console.log(error);
      
    }
    try {
      await axios.get(`http://localhost:8080/footers/footer-seg/${res}`).then(res=>{
        
    });
      
    } catch (error) {
      console.log(error);
    }
    
    closeModal();
   
  };

  
 

  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div>
      <Box sx={{ display: 'flex'}}>
       
        
      
      
      <AppBar style={{backgroundImage:`url(${backgound1})`,backgroundSize: 'cover', backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat', bottom:'50px', marginTop:"80px"}}>
           <div style={{marginTop:150, marginBottom:250, height:'200px'}}>
           <div className='container'>
             <div className='row'>
               <div style={{ border: '1px solid black' }} className='col-md-6 offset-md-3 offset-md-3' >
                
                <div className=' text-center'>
                 <br></br>
                 <h3 className='card-text' style={{color:'black'}}>Import Efact File</h3>
                <br></br>
                <br></br>
                <input type="file" onChange={handleFileSelect} />
                <br></br>
                <br></br>
               <button   onClick={handleSubmit} style={{ backgroundColor:"#27E09A", border:'none', color:'balck'}}>Import</button>

                <br></br>
               <br></br>
     
                </div>
            </div>
        </div>
    </div>
    {uploadSuccess && (
        <div className=' text-center'>
      <p style={{color:'black'}}>File Imported successfully!</p>
         <button style={{ backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', fontSize: '15px', height:'39%'}} onClick={()=>segregateFile(res)}>Close</button>
      </div>
  )}
    </div>
      
        
      </AppBar>
      
      
      
    </Box>
    
   
    </div>
    <SecFooter></SecFooter>
    </div>

  )
};

export default Upload;
