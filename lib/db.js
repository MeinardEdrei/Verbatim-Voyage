const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;