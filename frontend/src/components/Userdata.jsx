import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getDateFromTimestamp } from '@/utils/data.format'


function Userdata({ user }) {
    
  return (
      <div>
          <div className="p-2 bg-white rounded-xl ">
              <h3 className="text-3xl bg-gray-300 border border-black font-bold font-mono  flex  justify-center text-gray-800 p-2">{user.username}</h3>
              <hr className='border border-black ' />
               <h1 className='font-bold  text-xl' >USER DETAILS</h1>
              <div className='grid bg-gray-300 p-2 grid-cols-2 m-5  ' >
                  <p className="text-xl text-black mb-1"><strong>User Code:</strong> {user.empCode}</p>
                  <p className="text-xl text-black mb-1"><strong>Designation:</strong> {user.designation}</p>
                  <p className="text-xl text-black mb-1"><strong>Department:</strong> {user.department}</p>
                  <p className="text-xl text-black mb-1"><strong>Role:</strong> {user.role ? 'Admin' : 'User'}</p>
              </div>
              <h1 className='text-xl font-bold' >SYSTEM DETAILS</h1>
              <div className='grid bg-gray-300 p-2 grid-cols-2 m-5' >
                  <p className="text-xl text-black mb-1"><strong>RAM:</strong> {user.ram}</p>
                  <p className="text-xl text-black mb-1"><strong>System Type:</strong> {user.systemType}</p>
                  <p className="text-xl text-black mb-1"><strong>HDD:</strong> {user.hdd}</p>
                  <p className="text-xl text-black mb-1"><strong>Monitor Type:</strong> {user.monitorType}</p>
                  <p className="text-xl text-black mb-1"><strong>Brand:</strong> {user.brand}</p>
                  <p className="text-xl text-black mb-1"><strong>Monitor Serial No:</strong> {user.monitorSNo}</p>
                  <p className="text-xl text-black mb-1"><strong>OS:</strong> {user.os}</p>
                  <p className="text-xl text-black mb-1"><strong>MS Office:</strong> {user.msOffice}</p>
              </div>
              
              <p className="text-xl text-black mb-1">
                  <strong>Created At:  </strong>
                  {getDateFromTimestamp(user.createdAt)}
              </p>
          </div>

    </div>
  )
}

export default Userdata
