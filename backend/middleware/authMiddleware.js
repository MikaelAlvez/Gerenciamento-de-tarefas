const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Verifica se o cabeçalho Authorization está presente
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Remove a palavra "Bearer " do token
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Continua para a próxima função middleware ou rota
  } catch (err) {
    // Retorna um erro se o token for inválido
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
