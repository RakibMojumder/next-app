import mongoose from "mongoose";

const dbConnect = async () => await mongoose.connect(process.env.MONGODB_URI).then(() => console.log('DB Connected')).catch(e => console.log(e));

export default dbConnect;