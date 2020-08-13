import axios from 'axios';

const externalAPI = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

export default externalAPI;
