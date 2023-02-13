import mongoose from "mongoose";

const uri = process.env.NEXT_PUBLIC_MONGO_URI;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(uri);
    return connection;
  } catch (error) {
    console.log("db connection fail: ", error);
  }
};

export default dbConnect;
