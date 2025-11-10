import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'



const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate()
  const {setShowRecruiterLogin, companyToken, companyData, setCompanyData, setCompanyToken} =useContext(AppContext)

  const logout=()=>{
        setCompanyToken(null)
        localStorage.removeItem('companyToken')
        setCompanyData(null)
        navigate('/')
    }
  return (
    <div className='shadow py-4'>
      <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
        <img onClick={()=>navigate('/')} className='cursor-pointer max-sm:w-32' src={assets.logo} alt="" />
        {
          companyToken && companyData ? <div className='flex items-center gap-3 '>
            <Link to={'/dashboard'} className='bg-blue-100 rounded-md p-1'>Dashboard</Link>
            <p>|</p>
             <p className='max-sm:hidden'>Welcome, {companyData.name}</p>
             <div className='relative group'>
                            <img className='w-8 border border-gray-200 rounded-full' src={companyData.image} alt="" />
                            <div className='absolute hidden group-hover:block top-0 right-0 z-10
text-black rounded pt-12'>
                                <ul className='list-none m-0 p-2
bg-white rounded-md border border-gray-200 text-sm'>
                                    <li onClick={logout} className='py-1 px-2 cursor-pointer pr-10 text-red-600'>Logout</li>
                                </ul>
                            </div>
                        </div>
          </div> : user ? <div className='flex items-center gap-3 '>
            <Link to={'/applications'} className='bg-blue-100 rounded-md p-1'>Applied Jobs</Link>
            <p>|</p>
            <p className='max-sm:hidden'>Hi, {user.firstName+" " +user.lastName}</p>
            <UserButton/>
          </div> :  <div className='flex gap-4 max-sm:text-xs'>
          <button onClick={e => setShowRecruiterLogin(true)} className='text-gray-600 cursor-pointer'>Recruiter Login</button>
          <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full ml-3 cursor-pointer'>Login</button>
        </div>

        }
       
      </div>
    </div>
  )
}

export default Navbar
