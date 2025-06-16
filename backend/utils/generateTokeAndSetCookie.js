import jwt from "jsonwebtoken";

export const generateTokeAndSetCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};
