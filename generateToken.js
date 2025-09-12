require('dotenv').config();
const jwt = require('jsonwebtoken');

// Payload de teste
const payload = {
  userId: '123',      // id do usuário fictício
  role: 'vet',        // pode ser 'vet', 'admin', 'staff', etc
  name: 'Dr. José'
};

// Chave secreta do .env
const secret = process.env.JWT_SECRET || 'secret';

// Tempo de expiração
const options = { expiresIn: '1h' };

// Gera o token
const token = jwt.sign(payload, secret, options);

console.log('============================');
console.log('TOKEN JWT PARA POSTMAN:');
console.log(token);
console.log('============================');
