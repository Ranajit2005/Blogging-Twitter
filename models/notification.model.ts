import { Schema, model, models } from 'mongoose'

const NotificationSchema = new Schema({
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
   
},{ timestamps: true });

const Notification = models.Notification || model("Notification", NotificationSchema);

export default Notification;
