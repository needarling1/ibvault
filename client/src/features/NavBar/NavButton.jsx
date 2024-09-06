import React from 'react'

const NavButton = ( {text, href} ) => {
  return (
    <div>
        <a className = "relative text-2xl ms-6 cursor-pointer border-solid border-blue-600 hover:text-blue-600 hover:border-b-2" href = {href}>{text}</a> 
    </div>
  )
}

export default NavButton;