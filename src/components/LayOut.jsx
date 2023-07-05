import React from 'react'
import SideNavBar from './SideNavBar'
import { Outlet } from 'react-router-dom'
import HashTags from './HashTags'

const LayOut = () => {
  return (
    <div className='container w-full h-screen lg:w-4/5 mx-auto my-2 flex overflow-y-scroll'>
        <SideNavBar/>
        <Outlet/>
        <HashTags/>
    </div>
  )
}

export default LayOut