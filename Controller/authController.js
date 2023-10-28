const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config;

const { userCollection } = require("../Schema/userSchema");

const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashpassword = bcrypt.hashSync(req.body.password, salt);
    const role = req.body.role;

    await userCollection.create({
      fullName: req.body.fullName,
      username: req.body.username,
      password: hashpassword,
      role: role.toLowerCase(),
    });
    res.status(201).send("Created Successfully");
  } catch (error) {
    res.status(500).send("internal-server-error");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const userDetail = await userCollection.findOne({ username });

  if (!userDetail) return res.status(404).send("user-not-found");

  const doesPasswordMatch = bcrypt.compareSync(password, userDetail.password);

  if (!doesPasswordMatch) return res.status(400).send("Invalid-Credentials");

  const { username: user, _id, role } = userDetail;

  const token = jwt.sign(
    {
      username: user,
      userId: _id,
      role: role,
    },
    process.env.secret
  );

  res.send({
    message: "Sign in Succesfull",
    token,
    id: _id,
  });
};

const profile = async (req, res) => {
  try {
    const { userId } = req.decoded;
    const user = await userCollection.findById(userId, "-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("internal-server-error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId, role } = req.decoded;

    if (role !== "admin") return res.status(401).send("not-authorized");

    const user = await userCollection.findByIdAndDelete(userId);
    res.send({
      message: "User SuccesfullY Deleted",
      user,
    });
  } catch (error) {
    res.status(500).send("internal-server-error");
  }
};

module.exports = {
  login,
  profile,
  register,
  deleteUser,
};
