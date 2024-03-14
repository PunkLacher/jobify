import mongoose from "mongoose";
import { USER_ROLE } from "../utils/constants.js";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName',
    },
    location: {
        type: String,
        default: 'my city',
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        default: USER_ROLE.USER,
    },
    avatar: String,
    avatarPublicId: String,
})

//create method on User model to modify the instance of the user
//to not have the password property. This is so we can send
//user object as Json in response to front end on getCurrentUser controller
//and not haver it contain the users hashed password
UserSchema.methods.toJSON = function () {
    let obj = this.toObject()
    delete obj.password
    return obj;
}

export default mongoose.model('User', UserSchema)

