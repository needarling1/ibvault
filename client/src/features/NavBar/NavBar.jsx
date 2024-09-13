import NavButton from './NavButton'
import LoginButton from './LoginButton';
import LogoButton from './LogoButton';

const NavBar = () => {
  return (
    <div className ="flex h-[8vh] 3xl:h-[8vh] 4xl:h-[6vh] w-full justify-between items-center border-b border-gray-200 border-solid py-5">
      <div className = "relative ml-72">
        <LogoButton/>
      </div>

      <div className = "flex">
        <NavButton text = "Technicals" href = "/questions"/>
        <NavButton text = "Behaviorals" href = "/behaviorals"/>
        <NavButton text = "Resources" href = "/other"/>
        <NavButton text = "Help" href = "/help"/>
      </div>
      <div className = "mr-72">
        <LoginButton />
      </div>
    </div>
  )
}

export default NavBar;