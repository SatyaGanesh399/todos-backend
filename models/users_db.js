const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const addUser = async (data) => {
  const User = mongoose.model("User", userSchema);
  try {
    console.log("data before mongosaved", data);
    const newUser = new User(data);
    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser);
    return "Success";
  } catch (err) {
    console.error("Error saving User:", err);
    return "Failed to save the user";
  }
};

const getUserDetails = async (data) => {
  const User = mongoose.model("User", userSchema);
  try {
    const userDetails = await User.findOne({ emailId: data.emailId });
    return userDetails;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return {};
  }
};

module.exports = { addUser, getUserDetails };
