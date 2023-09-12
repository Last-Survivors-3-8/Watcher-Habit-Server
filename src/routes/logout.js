const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  return res.status(200).json({ message: 'Successfully logged out' });
});

module.exports = router;
