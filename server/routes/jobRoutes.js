import express from 'express';
import { getJobs, getJobById } from '../controllers/jobController.js';

const router = express.Router();

// Route to get all jobs data
router.get('/',getJobs);

// Route to get a specific job by ID
router.get('/:id',getJobById);

export default router;
