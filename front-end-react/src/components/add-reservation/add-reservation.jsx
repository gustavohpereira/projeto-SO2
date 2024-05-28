import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./style.css";

export const AddReservationComponent = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    roomPhoto: "",
    roomLocation: "",
    dateOfUse: "",
    startTime: "",
    endTime: "",
    responsible: "",
    reason: "",
    additionalInfo: "",
    guests: "",
  });
  const [backendIp, setBackendIp] = useState("");

  useEffect(() => {
    const ip = Cookies.get("backendIp") || "";
    setBackendIp(ip);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log("Adicionando nova reserva...", formData);
  
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
  
    axios
      .post(`http://${backendIp}/reservation/create`, formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Reserva criada com sucesso:", response.data);
          alert("Reserva criada com sucesso");
          // Redirecionar ou realizar outra ação após criar a reserva
        } else {
          console.error("Erro inesperado:", response.status);
          alert("Erro inesperado ao criar a reserva");
        }
      })
      .catch((error) => {
        console.error("Erro ao criar reserva:", error);
        alert("Erro ao criar reserva");
      });
  };

  return (
    <div className="container_create">
      <h2>Criar Nova Reserva</h2>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="roomName">Nome da Sala:</label>
          <input
            type="text"
            id="roomName"
            name="roomName"
            value={formData.roomName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomPhoto">Foto da Sala:</label>
          <input
            type="file"
            id="roomPhoto"
            name="roomPhoto"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="roomLocation">Local:</label>
          <input
            type="text"
            id="roomLocation"
            name="roomLocation"
            value={formData.roomLocation}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfUse">Data:</label>
          <input
            type="date"
            id="dateOfUse"
            name="dateOfUse"
            value={formData.dateOfUse}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Hora Início:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">Hora Final:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="responsible">Responsável:</label>
          <input
            type="text"
            id="responsible"
            name="responsible"
            value={formData.responsible}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Motivo:</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="additionalInfo">Informações Adicionais:</label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="guests">Convidados:</label>
          <input
            type="text"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Criar Reserva</button>
      </form>
    </div>
  );
};

