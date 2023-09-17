const AWS = require('aws-sdk');

AWS.config.update({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const uploadImage = async (photoBuffer, photoKey, contentType) => {
  const params = {
    Bucket: 'watcher-habit',
    Key: photoKey,
    Body: photoBuffer,
    ContentType: contentType,
    ACL: 'public-read',
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Location);
      }
    });
  });
};

module.exports = uploadImage;
