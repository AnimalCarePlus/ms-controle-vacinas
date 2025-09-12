const mongoose = require('mongoose');

const connectDB = async ()=>{
  try{
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ms-controle-vacinas');
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  }catch(err){
    console.error('Erro ao conectar MongoDB',err);
    process.exit(1);
  }
};

module.exports = connectDB;
