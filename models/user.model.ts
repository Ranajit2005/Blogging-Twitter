import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
    },
    username:{
        type: String,
        required: true,
        // unique: true,
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    password: {
        type: String,
        // required: true,
    },
    coverphoto:{
        type: String,
        // default: "",
    },
    profilePhoto:{
        type: String,
        // default: "",
    },
    bio:{
        type: String,
        // default: "",
    },
    location:{
        type: String,
        // default: "",
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        // default: [],
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        // default: [],
    }],
    notification: [{
        type: Schema.Types.ObjectId,
        ref: "Notification",
        // default: [],
    }]
},{ timestamps: true });

const User = models.User || model("User", UserSchema);

export default User;
