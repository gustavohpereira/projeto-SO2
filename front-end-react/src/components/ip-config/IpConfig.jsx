import React, { useState } from 'react';
import Cookies from 'js-cookie';
import "./style.css"

const IpConfig = () => {
  const [ipAddress, setIpAddress] = useState('');

  const saveIpAddress = () => {
    Cookies.set('backendIp', ipAddress);
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Configurar Endereço IP do Back-end</h2>
      <input 
        type="text" 
        placeholder="Digite o IP do Back-end" 
        value={ipAddress} 
        onChange={(e) => setIpAddress(e.target.value)} 
      />
      <button onClick={saveIpAddress}>Salvar</button>
    </div>
  );
};

export default IpConfig;