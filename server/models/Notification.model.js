import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    TaskID: { type: String, ref: 'Task' },
    Message: { type: String },
    Type: { type: String },
    Status: { type: String },
    Date: { type: Date },
});

export const Notification = mongoose.model('Notification', notificationSchema);

