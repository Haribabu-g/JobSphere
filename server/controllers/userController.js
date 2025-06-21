import JobApplication from '../models/JobApplication.js';
import User from '../models/User.js';
import Job from '../models/Job.js';
import { v2 as cloudinary } from 'cloudinary';
// Get User data from the database
export const getUserData = async (req, res) => {
  // console.log("req.auth:", req.auth);

  const userId = req.auth?.userId; // Extract userId from Clerk auth object
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Missing userId in req.auth.",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found in the database.",
      });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`,
    });
  }
};
// apply for a job
export const applyForJob = async (req, res) => {
  const jobId = req.body.jobId;
  const userId = req.auth?.userId; // Ensure `userId` is properly accessed
  // console.log("applyForJob: jobId", jobId);
  // console.log("applyForJob: userId", userId);

  try {
    // Check if the job ID or user ID is missing
    if (!jobId || !userId) {
      return res.status(400).json({
        success: false,
        message: `Missing jobId or userId.`,
      });
    }

    // Check if the user has already applied
    const isApplied = await JobApplication.findOne({ jobId, userId });
    if (isApplied) {
      return res.status(400).json({
        success: false,
        message: `Already Applied!`,
      });
    }

    // Fetch the job details
    const jobData = await Job.findById(jobId);
    if (!jobData) {
      return res.json({
        success: false,
        message: `Job Not Found for the provided ID!`,
      });
    }

    // Create the job application
    if (!isApplied) {
      await JobApplication.create({
        companyId: jobData.companyId,
        userId,
        jobId,
        date: new Date(), // Use `new Date()` for consistency
      });
    }

    res.status(201).json({
      success: true,
      message:
        "Applied for the job successfully and created an application!",
    });
  } catch (error) {
    console.error(`[controller/userController/applyForJob]:`, error);
    res.status(500).json({
      success: false,
      message: `[controller/userController/applyForJob]: ${error.message}`,
    });
  }
};


// get user applied applications

export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();
    if (!applications) {
      return res.json({
        message: false,
        message: `job applications found for this user`,
      });
    }
    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({
      success: false,
      message: `[controller/userController/getUserJobApplications]: ${error.message}`,
    });
  }
};


//update user (resume)

export const updateUserresume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    const userData = await User.findById(userId);
    if (resumeFile) {
      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = resumeUpload.secure_url;
    }

    await userData.save();

    return res.json({
      success: true,
      message: "Resume updated successfully",
      resume: userData.resume
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};