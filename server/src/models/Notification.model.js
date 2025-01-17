import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    TaskID: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    Message: { type: String },
    ImageUrl: { type: String },
    Type: { type: String },
    Status: { type: String },
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{timestamps:true});

export const Notification =mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

