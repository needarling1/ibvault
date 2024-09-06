import React from 'react'
import NavButton from './NavButton'
const NavBar = () => {
  return (
    <div className ="flex w-full justify-between border-b border-gray-200 border-solid py-5">
      <div className = "relative text-2xl ml-96">
        BIWS
      </div>

      <div className = "flex">
        <NavButton text = "Problems"/>
        <NavButton text = "Resources"/>
        <NavButton text = "Other"/>
      </div>

      <div className = "relative text-2xl mr-96 cursor-pointer">
        Login
      </div>
    </div>
  )
}

export default NavBar;