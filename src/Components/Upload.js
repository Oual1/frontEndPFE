import React, { useState } from 'react';
import axios from 'axios';
import Modal from "react-modal";

const Upload = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async() => {
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/uploads",
        data: formData,
        
        headers: { "Content-Type": "multipart/form-data" },
      }
      );
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
 

  return (
    <div style={{marginTop:50, marginBottom:250}}>
    <div className='container'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h3 className='text-center'>Upload Efact File</h3>
                <div className='card-body'>
                <input type="file" onChange={handleFileSelect} />
      <button onClick={handleSubmit}>Upload</button>
      <Modal isOpen={modalIsOpen} ariaHideApp={false} style={{ content: { width: '20%', height: '17%', top: '25%', left: '40%'} }}>
      {uploadSuccess && <p>File uploaded successfully!</p>}
        <button class="btn border-0 btn-primary" onClick={closeModal}>Close</button>
      </Modal>
                </div>
            </div>
        </div>
    </div>
    </div>

  )
};

export default Upload;
<a class="nav-link btn border-0 btn-primary" href="">Contact</a>