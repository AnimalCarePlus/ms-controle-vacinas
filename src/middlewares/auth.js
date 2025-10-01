const axios = require('axios');

const AUTH_VALIDATE_URL = process.env.AUTH_VALIDATE_URL;


module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  try {
    const response = await axios.get(
      AUTH_VALIDATE_URL,
      {
        headers: {
          Authorization: token 
        },
        validateStatus: () => true
      }
    );

    if (response.status === 204) {
      req.user = { token };
      return next();
    }

    return res.status(401).json({ error: 'Token inválido ou expirado' });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao validar token' });
  }
};
