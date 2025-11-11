import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const Applications = () => {
  const {user} = useUser()
  const {getToken} = useAuth()
  const [isEdit,setIsEdit] = useState(false)
  const [resume,setResume] = useState(null)

  const {backendUrl, userData, userApplications, isUserApplicationsLoading, fetchUserData, fetchUserApplications} = useContext(AppContext)

  const updateResume = async () =>{
      try {
        const formData = new FormData()
        formData.append('resume',resume)

        const token = await getToken()

        const {data} = await axios.post(backendUrl+'/api/users/update-resume',formData,{headers:{Authorization :`Bearer ${token}`}})
        if (data.success) {
          toast.success(data.message)
          await fetchUserData()
        }else{
           toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }

      setIsEdit(false)
      setResume(null)
  }

  useEffect(()=>{
    if (user) {
      fetchUserApplications()
    }
  },[user])
  return (
    <>
    <Navbar/>
    <div className=' container px-4 min-h-[65vh] 2x1:px-20 mx-auto my-10'>
      <h2 className='text-x1 font-semibold'>Your Resume</h2>
      <div className='flex gap-2 mb-6 mt-3'>
        {
          isEdit || (userData && userData.resume === '') ?
          <>
          <label className='flex items-center cursor-pointer' htmlFor="resumeUpload">
            <p className='bg-blue-100
text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select Resume"}</p>
            <input id='resumeUpload' onChange={e=>setResume(e.target.files[0])} accept="application/pdf" type="file" hidden/>
            <img className='cursor-pointer' src={assets.profile_upload_icon} alt="" />
          </label>
          <button onClick={updateResume} className='cursor-pointer bg-green-100 border
border-green-400 rounded-lg
 px-4 py-2'>Save</button>
          </>
          :
          userData ? (
            <div className='flex gap-2'>
                <a href={userData.resume} target='_blank' className='bg-blue-100
text-blue-600 px-4 py-2 rounded-lg'>
                  Resume
                </a>
                <button onClick={()=>setIsEdit(true)} className='text-gray-500 border
border-gray-300 rounded-lg px-4 py-2 cursor-pointer'>Edit</button>
            </div>
          ) : null
        }
      </div>
      <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
      {isUserApplicationsLoading ? <Loading /> : userApplications.length > 0 ? (
        <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
          <thead>
            <tr>
              <th className='py-3 px-4 border-b border-gray-200 text-left'>Company</th>
              <th className='py-3 px-4 border-b border-gray-200 text-left '>Job Title</th>
              <th className='py-3 px-4 border-b border-gray-200 text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b border-gray-200 text-left max-sm:hidden max-md:hidden'>Date</th>
              <th className='py-3 px-4 border-b border-gray-200 text-left '>Status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((job,index)=> (
              <tr key={index} className='align-middle'>
                <td className='py-3 px-4 flex items-center gap-2 border-b border-gray-200'>
                  <img className='w-8 h-8' src={job.companyId.image} alt="" />
                  {job.companyId.name}
                </td>
                <td className='py-2 px-4 border-b border-gray-200'>{job.jobId.title}</td>
                <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden'>{job.jobId.location}</td>
                <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden max-md:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b border-gray-200'><span className={`${job.status === 'Accepted' ? 'bg-green-100' : job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>{job.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-xl sm:text-xl'>No jobs applied yet</p>
      )}
    </div>
    <Footer/>
    </>
  )
}

export default Applications