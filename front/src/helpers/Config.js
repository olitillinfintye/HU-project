import axios from 'axios';

const ip = axios.create({
    baseURL: 'http://localhost:3000',
});

export default ip;