const axios = require('axios')

const sumip = axios.create({
    baseURL: 'http://127.0.0.1:4000',
});

const frontip = axios.create({
    baseURL: 'http://localhost:3001',
});

module.exports = {
    sumip,
    frontip
}
