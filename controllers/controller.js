import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";

export const signin = async (req, res) => {
    const { username, email, password } = req.body;
    //console.log(username, email, password);
    if (!password || (!username && !email))
        return res.status(400).json({ message: "Username/email and password are required" });
    try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user)
            return res.status(400).json({ message: "Invalid Username/Email" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid password" });
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(201).json({ message: "Signin successful", token });
    } catch (error) {
        console.error("Error in signin:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    //console.log(username, email, password);
    if (!password || !username || !email)
        return res.status(400).json({ message: "Username, Email and password are required" });
    if (password.length < 6)
        return res.status(400).json({ message: "Password should be atleast 6 characters" });
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email))
        return res.status(400).json({ message: "Invalid email provided" });
    try {
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists)
            return res.status(400).json({ message: "Username/Email already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const update = async (req, res) => {
    const { email, password } = req.body;
    //console.log(email, password);
    try {
        const user = await User.findById(req.user.id);
        if (!user)
            return res.status(400).json({ message: "User not found" });
        if (email && !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email))
            return res.status(400).json({ message: "New email is invalid" });
        if (password && password.length < 6)
            return res.status(400).json({ message: "New Password should be atleast 6 characters" });
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser)
                return res.status(400).json({ message: "User with given email already exists" });
            user.email = email;
        }
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        await user.save();
        res.status(201).json({ message: "Profile update successful" });
    } catch (error) {
        console.error("Error in update:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};