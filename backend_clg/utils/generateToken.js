const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  const expiryDays = parseInt(process.env.JWT_EXPIRY, 10) || 7;
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: `${expiryDays}d`,
  });
};

module.exports = generateToken;