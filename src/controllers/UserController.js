const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")
const jwt = require("jsonwebtoken")
const secret = "secret"


const createUser = async (req, res) => {
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
  const userData = { ...req.body, password: hashedPassword };
 
  // If profilePic comes in as an empty object `{}`, delete it to prevent CastError
  if (userData.profilePic && typeof userData.profilePic === "object") {
    delete userData.profilePic;
  }

  try {
    const savedUser = await userSchema.create(userData);
    //mail..
    await mailSend(
      savedUser.email,
      "Welcome Mail",
      "Welcome to expense manager app",
    );
    if (savedUser) {
      res.status(201).json({
        message: "user created..",
      });
    } else {
      res.status(500).json({
        message: "user not created..",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error while creating user..",
    });
  }
};
const getAllUsers = async (req, res) => {
  const query = req.query
  try {
    const users = await userSchema.find(query);
    res.status(200).json({
      message: "users",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while ferching user",
      err: err,
    });
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id
  try {
    const deletedUser = await userSchema.findByIdAndDelete(id)
    if (deletedUser) {
      res.status(200).json({
        message: "user deleted..",
        data: deletedUser
      });
    } else {
      res.status(404).json({
        message: "user not found..",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error while deleting user..",
      err: err,
    });
  }
};

const loginUser = async (req, res) => {

  const { email, password } = req.body
  try {

    const foundUserFromEmail = await userSchema.findOne({ email })
    console.log(foundUserFromEmail)
    if (foundUserFromEmail) {

      //compare encrypted and plain passwoerd
      if (bcrypt.compareSync(password, foundUserFromEmail.password)) {
        //token generate..
        const token = jwt.sign(foundUserFromEmail.toObject(), secret)
        res.status(200).json({
          message: "user logged in..",
          // data:foundUserFromEmail,
          token: token
        })
      } else {
        res.status(401).json({
          message: "invalid credentials",
        })
      }
    } else {
      res.status(404).json({
        message: "user not found..",
      })
    }
  } catch (err) {
    res.status(500).json({
      message: "error while logging in..",
      err: err
    })
  }

}

module.exports = {

  createUser,
  getAllUsers,
  deleteUser,
  loginUser

}

