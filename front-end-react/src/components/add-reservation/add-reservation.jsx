import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./style.css"

export const AddReservation = () => {

  const [backendIp, setBackendIp] = useState('');
  
  
  const [formData, setFormData] = useState({
    roomName: '',
    roomPhoto: '',
    roomLocation: '',
    dateOfUse: '',
    startTime: '',
    endTime: '',
    responsible: '',
    reason: '',
    additionalInfo: '',
    guests: ''
  });
  
  useEffect(() => {
    const ip = Cookies.get('backendIp') || '';
    setBackendIp(ip);
  }, []);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${backendIp}/reservation/create`, formData);
      if (response.status === 200) {
        console.log('Reserva criada com sucesso:', response.data);
        alert('Reserva criada com sucesso');
        // Redirecionar ou realizar outra ação após criar a reserva
      }
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      alert('Erro ao criar reserva');
    }
  };

  return (
    <div className="container">
      <h2>Criar Nova Reserva</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="roomName">Nome da Sala:</label>
          <input type="text" id="roomName" name="roomName" value={formData.roomName} onChange={handleChange} required />
        </div>
        {/* Adicione os outros campos do formulário aqui */}
        <button type="submit">Criar Reserva</button>
      </form>
    </div>
  );
};

export default AddReservation;