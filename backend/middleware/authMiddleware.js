const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assumindo que você tem um modelo de usuário

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assume que o token é passado como "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não encontrado!' });
  }

  try {
    const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); // Substitua 'YOUR_SECRET_KEY' pela chave secreta do JWT
    const user = await User.findByPk(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado!' });
    }

    req.user = { userId: user.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido!' });
  }
};

module.exports = authMiddleware;
