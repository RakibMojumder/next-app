import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
});

export default mongoose.models.users || mongoose.model('users', userSchema);