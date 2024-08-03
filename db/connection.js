const mongoose = require("mongoose");

const connectToDataBase = async () => {
  console.log("came here");
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection is established");
  } catch (err) {
    console.log("Error connecting to the database", err);
  }
};

module.exports = { connectToDataBase };
