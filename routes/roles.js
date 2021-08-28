const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const { rolesGet, rolesPost } = require('../controllers/roles');

const router = Router();

router.get('/', rolesGet);
router.post('/', [
  check('rolename', 'El rol es obligatorio').not().isEmpty(),
  validarCampos
], rolesPost);

module.exports = router;