const Role = require('../models/role');
const Usuario = require('../models/usuario');

const isValidRole = async (rolename = '') => {
  const rolIsValid = await Role.findOne({rolename});
  if(!rolIsValid){
    throw new Error(`El rol <<${rolename}>> es inválido, no esta registrado.`);
  }
};

const emailExists = async (correo = '') => {
  const mailExiste = await Usuario.findOne({correo});
  if(mailExiste){
    throw new Error(`El Email <<${correo}>> ya está registrado`);
  }
}

const userExists = async (id) => {
  const usuarioExiste = await Usuario.findById(id);
  if(!usuarioExiste){
    throw new Error(`El ID: <<${id}>> no existe`);
  }
}

module.exports = {
  isValidRole,
  emailExists,
  userExists
}