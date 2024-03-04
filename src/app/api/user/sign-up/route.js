import dbConnect from "@/config/dbConnect"
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export const POST = async (request) => {
    try {
        dbConnect();
        const data = await request.json();
        const isUserExist = await User.findOne({ email: data.email });

        if (isUserExist) {
            return NextResponse.json({ success: false, msg: 'user already exist' })
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const res = await User.create({ ...data, password: hashedPassword });

        if (res.email) {
            return NextResponse.json({ success: true, msg: 'Successfully create a account' });
        }

        return NextResponse.json({ success: false, msg: 'Something went wrong' })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err.message })
    }
}