import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    level:{type: String, required: true}, 
    salary: {
        type: Number,
        required: true
    },
    date:{type: Number, required: true, default: Date.now},
    visible:{type: Boolean, default: true},
    companyId:{type:mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},},
    { timestamps: true });


const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);

export default Job;