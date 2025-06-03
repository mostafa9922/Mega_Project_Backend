const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name || email || password)) {
    res.status(400).json({
      status: 400,
      data: { data: null, message: "missing data" },
    });
  }

  const checkExistUser = await userSchema.findOne({ email });

  if (checkExistUser) {
    return res.status(401).json({
      status: 401,
      data: { data: null, message: "user already exist" },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 6);

  const regUser = await userSchema({
    name,
    email,
    password: hashedPassword,
  });

  await regUser.save();

  return res.status(201).json({
    status: 201,
    data: { data: null, message: "user registered success" },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    return res.status(400).json({
      status: 400,
      data: { data: null, message: "missing data" },
    });
  }

  const loggedUser = await userSchema.findOne({ email });

  if (!loggedUser) {
    return res.status(401).json({
      status: 401,
      data: { data: null, message: "user not found" },
    });
  }

  const checkPass = await bcrypt.compare(password, loggedUser.password);

  if (!checkPass) {
    return res.status(401).json({
      status: 401,
      data: { data: null, message: "incorrect password" },
    });
  }

  const token = await jwt.sign(
    {
      email: loggedUser.email,
      role: loggedUser.role,
      name: loggedUser.name,
      id: loggedUser._id,
    },
    process.env.SECRET_KEY
  );

  return res.status(201).json({
    status: 201,
    data: { token, message: "user logged in success" },
  });
};

module.exports = {
  register,
  login,
};
