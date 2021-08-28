const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  rolename: {
    type: String,
    required: [true, 'El rol es obligatorio']
  }
});

module.exports = model('Roles', RoleSchema);