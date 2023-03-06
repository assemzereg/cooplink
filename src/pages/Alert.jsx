import React from 'react'
import Logo from '../assets/logo/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'

const Alert = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/home')
    }, 5000)
  }, [])

  return (
    <div className="w-full h-screen bg-primary-500 ">
      <div className="bg-2 bg-contain flex flex-col items-center justify-center h-full w-full p-16 relative">
        <img src={Logo} alt="" className="mb-10" />
        <h1 className="font-bold text-orange-500 text-4xl mb-10">
          Your budget is too low!
        </h1>
        <HashLoader loading={true} color="white" />
      </div>
    </div>
  )
}

export default Alert
