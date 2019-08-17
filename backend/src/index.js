// importacao das dependencias necessarias para funcionar a API
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// lidar com rotas e parametros
const app = express();

// divide o servidor para permitir protocolo http ou websocket(mobile)
const server = require('http').Server(app);
const io = require('socket.io')(server);

// conexao com o BD MongoDB(online - MongoDB Atlas -> https://cloud.mongodb.com)
mongoose.connect('mongodb+srv://semana:semana@cluster0-c2iv7.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

// repassa a informacao em tempo real para todas as rotas no front-end
app.use((req, res, next) => {
  req.io = io;
  next();
});

// permite que todas url, servidores possam acessar o app
app.use(cors());

// rota para acessar as imagens da app
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// declara as rotas da app
app.use(require('./routes'));

server.listen(3333);




