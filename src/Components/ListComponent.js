import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function ListComponent() {
    const [list,setList]=useState([]);
    const [file,setFile]=useState(null);
  
    const [files, setFiles] = useState([]);
    const [fileContents, setFileContents] = useState([]);
  

    const show=()=>{
        axios.get("http://localhost:8089/file/getAlll")
        .then(response=>{
           const list=response.data;
          console.log(list);
            setList(list);
        })
    }
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await fetch("http://localhost:8089/file/upload2", {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setFiles(data);
      if (data.length > 0) {
        const fileContentsResponse = await fetch(`http://localhost:8089/file/${data[0]}`);
        const contents = await fileContentsResponse.json();
        setFileContents(contents);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fileUploadHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    try {
      const response = await fetch("http://localhost:8089/file/upload2", {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setFiles(data);
      if (data.length > 0) {
        const fileContentsResponse = await fetch(`http://localhost:8089/file/${data[0]}`);
        const contents = await fileContentsResponse.json();
        setFileContents(contents);
      }
    } catch (error) {
      console.error(error);
    }
  };



    const ajout = () =>{
        var formdata = new FormData();
formdata.append("file",  file);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};


fetch("http://localhost:8089/file/upload", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    }
    
   
  return (
    <div>
        {list.map(elt=> 
           <p>{elt.name}</p>
        )}
        <section id="Get-loan">
       
       <div class="container">
           <div class="row">
               <div class="col-md-6">
               <form onSubmit={(e)=>{ e.preventDefault();
          ajout();}}>
            <input type="file" onChange={(e)=>setFile(e.target.files[0])}/>
        <button class="nav-link btn border-0 btn-primary" type="submit"  >submit file for tracability</button></form>
                  
               </div>



             
             <h2>if you want submit file and show the split part</h2>
             <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fileInput">Select a file:</label>
          <input type="file" className="form-control-file" id="fileInput" name="file" onChange={fileUploadHandler} />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      {files.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
          {fileContents.length > 0 && (
            <div>
              <h2>File Contents:</h2>
              <ul>
                {fileContents.map((content, index) => (
                  <li key={index}>{content}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>

             
               <div class="col-md-6">
                   <div class="choose-img">
                       <img src="./source/images/gestion.png" alt=""/>
                     
                       <button class="nav-link btn border-0 btn-primary" type="submit"> <a class="nav-link text-dark" href="/list/show">Show File</a></button>

                   </div>
               </div>
           </div>
       </div>
       
 
</section>
 
       
        
      

    </div>
    
  )
}
//rfc

