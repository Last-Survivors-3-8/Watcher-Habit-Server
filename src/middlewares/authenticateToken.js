const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '토큰이 제공되지 않았습니다.' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: '토큰이 만료됐습니다.' });
      }

      return res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
    }

    req.user = user;
    return next();
  });

  return null;
};

module.exports = authenticateToken;
