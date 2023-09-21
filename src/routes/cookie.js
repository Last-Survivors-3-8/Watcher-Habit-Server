const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use('/send-cookie', (req, res, next) => {
  res.send(req.cookies);
});

const refreshToken = jwt.sign(
  { userId: '6502af8ec31b6b6329a90887' },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: '7d' },
);
// 쿠키를 생성해주는 api
router.use('/set-cookie', (req, res, next) => {
  res.cookie('name', 'wangmin', { path: '/' });
  res.cookie('refreshToken', refreshToken, {
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.sendStatus(200);
});

module.exports = router;
