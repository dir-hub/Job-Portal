import React, { useContext, useEffect, useState } from 'react'
import { viewApplicationsPageData, assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import axios from 'axios'

const ViewApplication = () => {

  const { backendUrl, companyToken } = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)

  // Function to fetch company Job Applications data

  const fetchCompanyJobAppIications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants', { headers: { token: companyToken } })

      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  //Function to Update Job Applications Status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        fetchCompanyJobAppIications()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    fetchCompanyJobAppIications()
  }, [companyToken])
  return applicants ? applicants.length === 0 ? (
  <div className='flex items-center justify-center h-[70vh]'><p className='text-xl sm:text-2xl'>No Applications Available</p></div>) : (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm'><thead>
          <tr className='border-b border-gray-200'>
            <th className='py-2 px-4 text-left max-sm:hidden'>#</th>
            <th className='py-2 px-4 text-center'>User name</th>
            <th className='py-2 px-4 text-left max-sm:hidden max-md:hidden'>Job Title</th>
            <th className='py-2 px-4 text-left max-sm:hidden max-md:hidden'>Location</th>
            <th className='py-2 px-4 text-center'>Resume</th>
            <th className='py-2 px-4 text-center'>Action</th>
          </tr>
        </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr key={index} className='text-gray-700'>
                <td className='py-2 px-4 border-b border-gray-200 text-center'>{index + 1}</td>
                <td className='py-4 sm:py-4.5 lg:py-7.5 px-4 border-b border-gray-200 text-center flex items-center'>
                  <img className='w-10 h-10 rounded-full mr-3 max-sm:hidden' src={applicant.userId.image} alt="" />
                  <span>{applicant.userId.name}</span>
                </td>
                <td className='py-2 px-4 border-b border-gray-200  max-sm:hidden max-md:hidden'>{applicant.jobId.title}</td>
                <td className='py-2 px-4 border-b border-gray-200 max-sm:hidden max-md:hidden'>{applicant.jobId.location}</td>
                <td className='py-2 px-4 border-b border-gray-200'>
                  <a href={applicant.userId.resume} target='_blank' className='bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center'>
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='py-4 px-4 sm:py-3 md:py-6 border-b border-gray-200 relative flex justify-center items-center'>
                  {applicant.status === 'Pending' ? <div className='relative inline-block text-center group'>
                    <button className='text-gray-500 action-button cursor-pointer'>...</button>
                    <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border
border-gray-200 rounded shadow group-hover:block '>
                      <button onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')} className='block w-full text-center px-4 py-2  text-blue-500
hover:bg-gray-100 cursor-pointer'>Accept</button>
                      <button onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')} className='block w-full text-center px-4 py-2  text-red-500
hover:bg-gray-100 cursor-pointer'>Reject</button>
                    </div>
                  </div> :
                    <div>
                      {applicant.status}
                    </div>}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default ViewApplication