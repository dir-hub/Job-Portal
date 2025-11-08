import express from 'express'
import { getJobs,getJobsById } from '../controllers/jobController.js'

const router = express.Router()

// Route to get all jobs data
router.get('/',getJobs)

// Route to get a single job by ID
router.get('/:id',getJobsById)

export default router