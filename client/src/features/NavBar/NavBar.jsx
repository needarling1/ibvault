import NavButton from './NavButton'
import LoginButton from './LoginButton';

const NavBar = () => {
  return (
    <div className ="flex h-20 w-full justify-between items-center border-b border-gray-200 border-solid py-5">
      <div className = "relative ml-96">
        <NavButton text = "BIWS" href = "/"/>
      </div>

      <div className = "flex">
        <NavButton text = "Technicals" href = "/questions"/>
        <NavButton text = "Behaviorals" href = "/resources"/>
        <NavButton text = "Other" href = "/other"/>
        <NavButton text = "Help" href = "/help"/>
      </div>
      <LoginButton />
    </div>
  )
}

export default NavBar;