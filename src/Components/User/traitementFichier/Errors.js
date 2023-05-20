import React from 'react'

function Errors() {
  const [attestations, setAttestations]= useState([]);

  function getAllAttestations(){
    axios.get(`http://localhost:8080/details/all-attestations/${id}`) // Remplacez '/students' par l'URL de votre endpoint pour récupérer les étudiants
    .then(response => {
      setAttestations(response.data);
    })
    .catch(error => {
      console.error(error);
    });

  }
  return (
    <div>Errors</div>
  )
}

export default Errors;