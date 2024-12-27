import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
    ProjectID: { type: String, ref: 'Project', required: true },
    ReportType: { type: String },
    GeneratedDate: { type: Date },
    Content: { type: String },
  });

const Report = mongoose.model('Report', ReportSchema);

export default Report;