import React from 'react'
import NavButton from './NavButton'
const NavBar = () => {
  return (
    <div className ="flex h-20 w-full justify-between items-center border-b border-gray-200 border-solid py-5">
      <div className = "relative text-2xl ml-96">
        <span>BIWS</span>
      </div>

      <div className = "flex">
        <NavButton text = "Questions"/>
        <NavButton text = "Resources"/>
        <NavButton text = "Other"/>
        <NavButton text = "Help"/>
      </div>

      <div className = "relative text-2xl mr-96 cursor-pointer">
        <span>Login</span>
      </div>
    </div>
  )
}

export default NavBar;