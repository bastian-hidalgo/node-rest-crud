/*
const { request, response } = require('express');
const res = require('express/lib/response');
const { connect } = require('mongoose');
const role = require('../models/role');
const usuario = require('../models/usuario');
const dbConnection = require('../database/dbConnection')

//Api para conectar parte react con base de datos.
const dataCone = () => {
    const allUser = await role.find(filter);
    const allPass = await usuario.find(filter);

    res.json({allPass,allUser});
    //conn.get('dbConnection');

    /* const conn = await mongoose.createConnection('mongodb://localhost:8080/test');
    // o
       const conn = await mongoose.createConnection(dbConnection);
       conn.getClient(); 
    
}
// mongoose.createConnection('mongodb://localhost:27017/mydb').port;
// o
// mongoose.createConnection(dbConnection).port;

connect.export(dataCone);
//getConnection();
*/