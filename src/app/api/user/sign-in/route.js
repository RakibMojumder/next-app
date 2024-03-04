import dbConnect from "@/config/dbConnect";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import user from "@/models/User";

export const POST = async (request) => {
    try {
        dbConnect();
        const { email, password } = await request.json();
        const isValidUser = await user.findOne({ email });

        if (!isValidUser) {
            return NextResponse.json({ success: false, msg: 'user not found' })
        }

        const isPassValid = await bcrypt.compare(password, isValidUser.password);

        if (!isPassValid) {
            return NextResponse.json({ success: false, msg: 'Invalid credential' });
        }

        const payload = {
            name: isValidUser.username,
            email: isValidUser.email
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1d' });
        cookies().set('token', token);
        cookies().set('user', JSON.stringify(payload))

        return NextResponse.json({ success: true, msg: 'Successfully login' })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message })
    }
}