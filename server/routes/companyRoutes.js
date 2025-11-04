import express from 'express'
import { ChangeJobApplicationsStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController'

const router = express.Router()

// Register a company
router.post('/register',registerCompany)

//Company login
router.post('/login',loginCompany)

// Get company data
router.get('/company',getCompanyData)

// Post a job
router.post('/post-job', postJob)

// Get Applicants Data of Company
router.get('/applicants',getCompanyJobApplicants)

// Get Company Job List
router.get('/list-jobs',getCompanyPostedJobs)

// Change Applcations Status
router.post('/change-status', ChangeJobApplicationsStatus)

// Change Applcations Visiblity
router.post('/change-visibility', changeVisiblity)

export default router