import { NavLink } from 'react-router-dom';

const NavButton = ( {text, href} ) => {
  return (
    <div className = "flex justify-start">
      <NavLink to = {href} 
               className = {({ isActive }) =>
        `flex flex-grow text-center relative text-l md:text-l l:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl 4xl:text-2xl mx-4 p-3 cursor-pointer rounded
        ${isActive ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-100'}`     
        
      }
      >
        {text}
      </NavLink> 
    </div>
  )
}

export default NavButton;