// Import required modules
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { fullName, username, email, password } = reqBody;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return NextResponse.json({ error: "Username or Email already exists" }, {status: 400});
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        const userId = savedUser._id;

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
