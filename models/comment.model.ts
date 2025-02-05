import { Schema, model, models } from 'mongoose'

const CommentSchema = new Schema({
    text: {
        type: String,
        required: true,
        // unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // default: [],
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        // default: [],
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        // default: [],
    }]
},{ timestamps: true });

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
