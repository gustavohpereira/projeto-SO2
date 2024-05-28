import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import IpConfig from './components/ip-config/IpConfig';
import Login from './components/login/login';
import ListReservations from './components/list-reservation/list-reservation';
import { AddReservationComponent } from './components/add-reservation/add-reservation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/ip-config" element={<IpConfig />} />
          <Route path="/list-reservations" element={<ListReservations />} />
          <Route path='/create-reservation' element={<AddReservationComponent></AddReservationComponent>}/>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);