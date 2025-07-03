import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateTokeAndSetCookie } from "../utils/generateTokeAndSetCookie.js";

export const signup = async (request, response) => {
	const { email, name, password } = request.body;
	try {
		if (!email || !password || !name)
			throw new Error("All fields are required");
		const userAlreadyExits = await User.findOne({ email });
		if (userAlreadyExits)
			return response
				.status(400)
				.json({ success: false, message: "User already exits" });

		const hashPassword = await bcryptjs.hash(password, 10);
		const verificationToken = generateVerificationCode();
		const user = new User({
			email,
			password: hashPassword,
			name,
			verificationToken,
			verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000,
		});

		await user.save();

		// Generate user Token
		generateTokeAndSetCookie(response, user._id);

		response.status(201).json({
			success: true,
			message: "User created successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		return response
			.status(400)
			.json({ success: false, message: error.message });
	}
};

export const login = async (request, response) => {
	response.send("LogIn route");
};

export const logout = async (request, response) => {
	response.send("LogOut route");
};
