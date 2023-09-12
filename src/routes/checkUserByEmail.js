const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(200).json({
        exists: false,
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
