import React from 'react'

const NavButton = ( {text, href} ) => {
  return (
    <div className = "flex justify-start">
        <a className = "flex relative text-2xl mx-6 cursor-pointer border-solid border-blue-600 hover:text-blue-600 hover:border-b-2" href = {href}>{text}</a> 
    </div>
  )
}

export default NavButton;