import express from 'express';
import { ChangeJobApplicationStatus, ChangeVisibility, getCompanyData, getCompanyJobApplications, getCompanyPostedJobs, loginCompany, postjob, RegisterCompany } from '../controllers/companyController.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/auth.js';

const router = express.Router();

//register a company
router.post('/register', upload.single('image'), RegisterCompany);
  
//company login'
router.post('/login',loginCompany)

//Get Company dataa
router.get('/company',protectCompany,getCompanyData)

//Post a JOB

router.post('/post-job',protectCompany,postjob)

//Get Company Job Applications
router.get('/applications',protectCompany,getCompanyJobApplications)


//get company job list
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

//change applications status
router.post('/change-status', protectCompany, ChangeJobApplicationStatus)

router.post('/change-visibility', protectCompany,ChangeVisibility)

export default router;