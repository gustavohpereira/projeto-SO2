import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./style.css"

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [backendIp, setBackendIp] = useState('');

  useEffect(() => {
    const ip = Cookies.get('backendIp') || '';
    setBackendIp(ip);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`http://${backendIp}/user/login`)
    try {
      const response = await axios.post(`http://${backendIp}/user/login`, {
        nome: username,
        senha: password,
      }, {
        validateStatus: (status) => status < 500, // Resolve only if the status code is less than 500
      });

      if (response.status === 200) {
        console.log('Login efetuado com sucesso:', response.data.message);
        alert('Login efetuado com sucesso');
        window.location.href = '/list-reservations';
      } else if (response.status === 401) {
        alert('Usuário ou senha inválidos');
      } else {
        console.error('Erro inesperado:', response.status);
        alert('Erro inesperado durante o login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro inesperado ao fazer login');
    }
  };

  return (
    <div className="login_wrapper">
      <a href="/ip-config">configurar ip</a>
      <div className="container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Login</button>
          <div className="form-footer">
            <span>Don't have an account? <a href="#">Sign up</a></span>
            <a href="#">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;