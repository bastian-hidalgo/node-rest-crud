const { request, response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuariosGet = async (req, res) => {
  const { limit = 5, skip = 0} = req.query;
  const query = { 'estado': true };
  const queryFetch = [
    Usuario.find(query).skip(Number(skip)).limit(Number(limit)),
    Usuario.countDocuments(query)
  ];
  const [ usuarios, total ] = await Promise.all(queryFetch);
  res.json({
    total, usuarios
  });
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
  const { nombre, edad, sexo, correo, rol, password } = req.body;
  const usuario = new Usuario({ nombre, edad, sexo, correo, rol, password });
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  await usuario.save();
  res.json({
    message: 'post API - controlador',
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

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
}