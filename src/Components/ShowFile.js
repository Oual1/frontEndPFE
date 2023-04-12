
import React, { useEffect, useState } from 'react'


export default function ShowFile() {
    const [result, setResult] = useState('');
    useEffect(()=>{
        const requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
      
        fetch("http://localhost:8089/file/download/1", requestOptions)
          .then(response => response.text())
          .then(result => setResult(result))
          .catch(error => console.log('error', error));
      }, []);
  return (
    <div>  {result}</div>
  )
}
