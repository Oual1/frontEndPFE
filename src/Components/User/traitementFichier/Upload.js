import React, { useState, useEffect } from 'react';
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

  const [userName, setUserName] = useState(0);
 


    function updateFile(idFile, idUser){
     // Remplacez par l'ID du fichier réel

    axios.put(`http://localhost:8082/files/put-UserId/${idFile}/${idUser}`)
      .then(response => {
        console.log('Le fichier a été mis à jour avec succès', response.data);
        // Effectuez les actions supplémentaires nécessaires après la mise à jour du fichier
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la mise à jour du fichier', error);
        // Gérez les erreurs en conséquence
      });
  };


  useEffect(() => {
  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
       
        const roleResponse = await axios.get(`http://localhost:8080/api/v1/auth/user-name`, {
          headers: { Authorization: `${token}` }
        });
        
        
        setUserName(roleResponse.data);
        
        
        
       
      }else {
        // Gérer le cas où le token est manquant
        setUserName(null)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du mail de l\'utilisateur:', error);
      // Gérez l'erreur ici
      setUserName(null);
      
    }
  };
  fetchUserName();
}, []);


 
  

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
    updateFile(res, userName);
    closeModal();
   
  };

  
 

  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <div>
      
       
        
      
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
     
       <Modal  isOpen={modalIsOpen} style={{ content: { width: '350px', height: '130px', marginLeft:'520px', marginTop:'150px' } }}>
   
        <div  className="text-center">
      <p style={{color:'black', }}>File Imported successfully!</p>
         <button style={{ backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', fontSize: '15px', height:'39%', width:'20%'}} onClick={()=>segregateFile(res)}>Close</button>
      </div>
      </Modal>
      
      
     
  )}
 
    </div>
      
        
     
      
      
      
   
    
   
    </div>
    <SecFooter></SecFooter>
    </div>

  )
};

export default Upload;
