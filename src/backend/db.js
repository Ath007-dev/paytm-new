import mongoose from 'mongoose';

await mongoose.connect("mongodb+srv://username:password@cluster0.h9x1j.mongodb.net/Paytm")

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
},{collection:'users'});
const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    balance: Number
});
const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", UserSchema);
export { User, Account };
