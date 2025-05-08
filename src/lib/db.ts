import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected to DB. 😊");
    return;
  }

  try {
    const db = await mongoose.connect(
      process.env.NEXT_PUBLIC_MONGODB_URI || "",
      {}
    );
    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected successfully.");
  } catch (error) {
    console.log("Database connection Failed. ❌", error);
    process.exit(1);
  }
}


export default dbConnect;