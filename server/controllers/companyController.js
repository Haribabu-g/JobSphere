// Register a new company 

import Company from "../models/Company.js";
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";





export const RegisterCompany = async (req, res) => {
    console.log("Debugging log: This function runs!");

console.log("Request Headers:", req.headers); 
    console.log("Request Body:", req.body); 
    console.log("Uploaded File:", req.file); 

    

    const { name, email, password } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !imageFile) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        // Check if company already exists
        const companyExists = await Company.findOne({ email });

        if (companyExists) {
            return res.json({ success: false, message: "Company already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({
            name,
            email,
            password: hashPassword,
            image: (await imageUpload).secure_url,

        })

        

        res.json({
            success: true,
            message: "Company registered successfully",
            company: {
                id: company._id,
                name: company.name,
                email: company.email,
                image: company.image,
            },
            token: generateToken(company._id)
        })



    } catch (error) {
        console.error("Error:", error); // Log actual error
    res.status(500).json({
        success: false,
        message: "Error registering company",
    });

    }
};

// company login

export const loginCompany = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if company exists
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Success
        res.json({
            success: true,
            message: "Company logged in successfully",
            company: {
                _id: company._id,
                name: company.name,
                email: company.email,
                image: company.image,
            },
            token: generateToken(company._id),
        });

    } catch(error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Error logging in company",
        });
    }
};


// get all companies

export const getCompanyData = async (req, res) => {
        
        try{
            const company = req.company;
            res.json({
                success: true,
                company})
        }

    catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }

}
//post a new job

export const postjob = async (req, res) => {
    const {title,description,location,salary,level,category}=req.body;

    const companyId = req.company._id;

    try{
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            companyId,
            date:Date.now(),
            level,
            category
        });
        await newJob.save();
        res.json({
            success: true,
            newJob
         })
        } catch (error) {
            res.json({
                success: false,
                message: error.message
            });
        }


}

// get company job applications

export const getCompanyJobApplications = async (req, res) => {
    try {
        const companyId = req.company._id;
        const applications = await JobApplication.find({ companyId })
            .populate("userId", "name email image resume")
            .populate("jobId", "title description location category level salary")
            .exec();

        if (!applications) {
            return res.json({
                success: false,
                message: "No job applications found for this company",
            });
        }

        res.json({ success: true, applications });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }




}


// get company posted jobs

export const getCompanyPostedJobs = async (req, res) => {

    try{
        const companyId = req.company._id;
        const jobs = await Job.find({ companyId })

        //todo: adding no.of applications to each job
        const jobsData = await Promise.all(jobs.map(async (job) => { const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length }; }));
            

        res.json({
            success: true,
            jobsData})
        
    }catch(error){
        res.json({
            success: false,
            message: error.message
        });
    }

}

// change job application status

export const ChangeJobApplicationStatus = async (req, res) => {
    try {
    const { id, status } = req.body;
    //find job application data and update the status
    await JobApplication.findOneAndUpdate({ _id: id }, { status });
    return res.json({ success: true, message: "Status has been Updated!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }



}


// change job visibility
export const ChangeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company?._id;

    // Log inputs for debugging
    console.log("Request Body:", req.body);
    console.log("Company ID:", companyId);

    // Find the job
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check ownership
    if (job.companyId.toString() !== companyId.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Toggle visibility
    job.visible = !job.visible;
    await job.save();

    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};