const AWS = require("aws-sdk");
const fs = require("fs");
const User = require("../models/userModel");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const uploadFileToS3 = (file) => {
  const fileContent = fs.readFileSync(file.path);
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fileContent,
    ContentType: file.mimetype,
  };
  return s3.upload(params).promise();
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const file = req.file;

    const s3Result = await uploadFileToS3(file);
    const photoUrl = s3Result.Location;

    const user = new User({ name, email, photoUrl });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
