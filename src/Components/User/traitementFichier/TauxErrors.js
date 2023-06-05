import React from 'react';

function TauxErrors() {
  const tauxErreur = 30; // Taux d'erreur fixe pour l'exemple

  return (
    <div>
      <div style={{ width: '200px', height: '20px', border: '1px solid #ccc' }}>
        <div
          style={{
            width: `${tauxErreur}%`,
            height: '100%',
            backgroundColor: 'red',
          }}
        />
      </div>
      <p>Taux d'erreur : {tauxErreur}%</p>
    </div>
  );
}

export default TauxErrors;