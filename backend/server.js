import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import router from "./routes/auth.route.js";

dotenv.config();

const app = express();
app.use(express.json()); // This will allow us to pass incoming requests with json payloads
const PORT = process.env.PORT || 5000;

app.get("/", (request, response) => {
	response.send("Hello World");
});

app.use("/api/auth", router);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on localhost:${PORT}`);
});
