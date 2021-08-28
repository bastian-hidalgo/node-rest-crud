const { request, response } = require('express');
const Role = require('../models/role');

const rolesGet = async (req, res) => {
  const filter = {};
  const all = await Role.find(filter);
  res.json({all});
};

const rolesPost = async (req,res = response) => {
  const { rolename } = req.body;
  const role = new Role({ rolename });
  const roleExists = await Role.findOne({ rolename });
  if(roleExists){
    return res.status(400).json({"message": `El rol <<${rolename}>> ya existe.`});
  }
  await role.save();
  res.json({
    messge: "Rol creado exitosamente.",
    role
  });
};

module.exports = {
  rolesGet,
  rolesPost
}