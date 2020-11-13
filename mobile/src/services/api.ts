import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333', /*pode-se usar localhost para emulador, para teste no smartphone + expo client use o ip do computador (servidor)*/
});

export default api;