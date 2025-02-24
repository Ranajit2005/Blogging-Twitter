import { Schema, model, models } from 'mongoose'
// import { boolean } from 'zod';

const PostSchema = new Schema({
    text: {
        type: String,
        required: true,
        // unique: true,
    },
    image:{
        type: String,
        // default: "",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // default: [],
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        // default: [],
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        // default: [],
    }]
},{ timestamps: true });

const Post = models.Post || model("Post", PostSchema);

export default Post;
