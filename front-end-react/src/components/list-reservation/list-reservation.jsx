import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./style.css"

export const ListReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [backendIp, setBackendIp] = useState('');

    useEffect(() => {
        const ip = Cookies.get('backendIp') || '';
        setBackendIp(ip);
        fetchReservations(ip);
    }, []);

    const fetchReservations = async (ip) => {
        try {
            const response = await axios.get(`http://${ip}/reservation/getAll`);
            const sortedReservations = response.data.sort((a, b) => new Date(a.dateOfUse) - new Date(b.dateOfUse));
            setReservations(sortedReservations);
            setFilteredReservations(sortedReservations);
            console.log('Reservas obtidas com sucesso:', sortedReservations);
        } catch (error) {
            console.error('Erro ao obter reservas:', error);
        }
    };

    const addReservation = () => {
        console.log('Adicionando nova reserva...');
        window.location.href = '/create-reservation';
    };

    const removeReservation = async (id) => {
        const confirmed = window.confirm('Tem certeza que deseja remover esta reserva?');
        if (!confirmed) {
            return;
        }
        try {
            await axios.delete(`http://${backendIp}/reservation/delete/${id}`);
            console.log('Reserva removida com sucesso');
            fetchReservations(backendIp);
        } catch (error) {
            console.error('Erro ao remover reserva:', error);
        }
    };

    const searchReservations = (query) => {
        setSearchQuery(query);
        if (!query) {
            setFilteredReservations(reservations);
            return;
        }
        const filtered = reservations.filter((reservation) =>
            reservation.roomName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredReservations(filtered);
        console.log('Reservas filtradas:', filtered);
    };

    return (
        <div id="app">
            <div className="container_list">
                <h2>Reservas Feitas</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Buscar por nome da sala"
                        value={searchQuery}
                        onChange={(e) => searchReservations(e.target.value)}
                    />
                </div>
                <button onClick={addReservation} type="button" className='add-reservation'>
                    Adicionar Nova Reserva
                </button>
                <div className="reservas-list">
                    {filteredReservations.map((re) => (
                        <div key={re.id} className="reserva-item">
                            <div className="reserva-info">
                                <h3 className='room-name'>{re.roomName}</h3> 
                                <img src={re.roomPhoto !== null ? re.roomPhoto:null } alt="Foto da Sala" className='room-image'/>
                                <p><strong>Sala:</strong> {re.roomName}</p>
                                <p><strong>Local:</strong> {re.roomLocation}</p>
                                <p><strong>Data:</strong> {re.dateOfUse}</p>
                                <p><strong>Hora Início:</strong> {re.startTime}</p>
                                <p><strong>Hora Final:</strong> {re.endTime}</p>
                                <p><strong>Responsável:</strong> {re.responsible}</p>
                                <p><strong>Motivo:</strong> {re.reason}</p>
                                <p><strong>Informações:</strong> {re.additionalInfo}</p>
                                <p><strong>Convidados:</strong> {re.guests}</p>
                            </div>
                            <button onClick={() => removeReservation(re.id)}>Remover</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListReservations;