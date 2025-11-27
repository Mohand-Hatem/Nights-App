import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Mongo Database Conected Successfully");
  } catch (error) {
    console.log("Error Database", error);
    process.exit(1);
  }
};

export default ConnectDB;
