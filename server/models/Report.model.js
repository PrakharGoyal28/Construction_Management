import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    ProjectID: { type: String, ref: 'Project', required: true },
    ReportType: { type: String },
    GeneratedDate: { type: Date },
    Content: { type: String },
  });

export const Report = mongoose.model('Report', reportSchema);

