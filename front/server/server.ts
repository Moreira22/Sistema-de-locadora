import axios from 'axios';

// URL do backend, incluindo a porta correta
const Api = axios.create({
    baseURL: 'http://localhost:8080/api', // <-- note o "http://localhost:8080"
    withCredentials: true, // se você estiver usando cookies ou sessão
});

export default Api;
