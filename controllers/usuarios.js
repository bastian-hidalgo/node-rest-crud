const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const req = require('express/lib/request');
const { all } = require('express/lib/application');

const usuariosGet = async (req, res) => {
  const { limit = 5, nombre, skip = 0} = req.query;
  const query = { 'estado': true };
  let regexp = null;
  if(nombre){
    regexp = new RegExp("^" + nombre , 'i');
  }

  const dataUsuarios = await Usuario.search(nombre, {nombre: regexp} , (err, results) => results);
  
  console.log(dataUsuarios);
  
  // go

  const queryFetch = [
    ...(nombre ? [dataUsuarios] : [Usuario.find(query).skip(Number(skip)).limit(Number(limit))]),
    Usuario.countDocuments(query)
  ];

  const [usuarios, total] = await Promise.all(queryFetch);
  console.log(usuarios, total);
  // go!
  // 
  res.json({
    total, usuarios
  });
  /* 
  const query = req.query;
  const regexp = new RegExp("^" + query.nombre);
  const data = {"nombre": regexp};
  Usuario.find(data, function(err, users) {
    if(err) {
        res.status(400).json({
            success: false, 
            message: 'Error procesando la búsqueda ' + err
        }); 
    };
    res.status(201).send(users);
    console.log(data);
  });*/
}
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...props } = req.body;
  if (password){
    const salt = bcrypt.genSaltSync();
    props.password = bcrypt.hashSync(password, salt);
  }
  const user = await Usuario.findByIdAndUpdate(id, props);
  res.json(user);
}
const usuariosPost = async (req, res = response) => {
  const { nombre, username, edad, gender, comuna_local, direccion_local, correo, rol, password } = req.body;
  const usuario = new Usuario({ nombre, username, edad, gender, comuna_local, direccion_local, correo, rol, password });
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  await usuario.save();
  res.json({
    message: 'Usuario creado',
    usuario
  });
}
const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  const uid = req.uid;
  // const user = await Usuario.findByIdAndDelete(id);
  const user = await Usuario.findByIdAndUpdate(id, {'estado': false});
  res.json({
    user,
    uid
  });
}


/*
function signIn (req, res){
  Usuario.find({ email: req.body.email, password: req.body.password }, (err, user) => {
    if(err) {
      return res.status(500).send({message: err})
    }
    if(!user){
      return res.status(404).send({message: 'No existe el usuario'})
    }
    req.Usuario = Usuario
    res.status(200).send({
      message: 'Te has logueado correctamente',
      usuariosGet
    })
  })
}
*/


module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}