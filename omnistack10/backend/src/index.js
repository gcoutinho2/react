const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

const databaseUri = 'mongodb+srv://couto:omnirocket10@cluster0-jpw8g.gcp.mongodb.net/week10?retryWrites=true&w=majority';

const connect = async () => {
    console.log(`Connecting to DB - uri: ${databaseUri}`);
    return mongoose.connect(databaseUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

connect()
    .then(() => {
        console.log('Database connected!');
    })
    .catch((e) => {
        console.log('Something went wrong: ', e.message);
    });

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);

// MÉTODOS HTTP: GET, POST, PUT, DELETE
// omnirocket10
/*

Tipos de parâmetros:

Query params: req.query (Filtros, ordenação, paginação, ....)
Route params: req.params (Identificar um recurso na alteração ou remoção)
Body: req.body (Dados para criação ou alteração de um registro)

MongoDB: (NOSql, banco não-relacional)

*/

