const express = require('express');
const multer = require('multer');
const uploadImage = require('../services/aws/s3');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const photoKey = `${Date.now().toString()}-${req.file.originalname}`;
    const url = await uploadImage(req.file.buffer, photoKey, req.file.mimetype);

    res.status(200).json({ message: '사진 업로드 성공', url });
  } catch (error) {
    res.status(500).json({ message: '업로드 에러', error });
  }
});

module.exports = router;
