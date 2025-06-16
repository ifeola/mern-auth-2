import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const dbUri = process.env.MONGO_URI;
		const conn = await mongoose.connect(dbUri);
		console.log("Database connected successfully:", conn.connection.host);
	} catch (error) {
		console.log("Database failed to connect:", error.message);
		process.exit(1);
	}
};
export default connectDB;
