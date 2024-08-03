const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

const { addUser, getUserDetails } = require("../models/users_db.js");

const Router = express.Router();

Router.post("/addUser", async (req, res) => {
  let userData = req.body;
  status_code = 400;
  try {
    message = userValidation(userData);
  } catch (error) {
    console.log("error in validation", error);
    message = "failed";
  }

  if (message == "success") {
    try {
      const hashedPassword = await generateHashedPasword(userData.password);
      userData.password = hashedPassword;
      message = await addUser(userData);
      status_code = 200;
    } catch (error) {
      console.log("error in database call", error);
      message = "failed";
    }
  }

  res.status(status_code).json({ message: message });
});

Router.post("/loginUser", async (req, res) => {
  let userData = req.body;
  status_code = 400;
  try {
    userDetails = await getUserDetails(userData);
    const passwordValidate = comparePaswords(
      userData.password,
      userDetails.password
    );
    if (passwordValidate) {
      status_code = 200;
      message = "Successfully loggedin";
    }
  } catch (error) {
    console.log("error in database call", error);
    message = "failed";
  }
  console.log("loggedin succesfully");
  res.status(status_code).json({ message: message });
});

const generateHashedPasword = async (password) => {
  return await bcrypt.hash(password, saltRounds);
};

const comparePaswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const userValidation = (data) => {
  return "success";
};

module.exports = Router;
