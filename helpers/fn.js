const bcryptjs = require('bcryptjs');

const validPassword = (pass, userPass) => bcryptjs.compareSync(pass, userPass);

module.exports = {
  validPassword
}
