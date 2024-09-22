import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../hooks/AuthContext';
import NavButton from './NavButton'
import LoginButton from './LoginButton';
import LogoButton from './LogoButton';
import CheckAuth from '../../hooks/CheckAuth';
import { useNavigate } from 'react-router-dom';

import instance from '../../hooks/AxiosInstance';

const NavBar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [loginButton, setLoginButton] = useState(<LoginButton text = "Sign In" to = "/login" />)

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await instance.post('/api/logout');
      const isAuthorized = await CheckAuth();
      setAuth({ authorized: isAuthorized, loading: false })
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth.authorized) {
      setLoginButton(<LoginButton text = "Sign Out" onClick = {handleLogout}/>);
    } else {
      setLoginButton(<LoginButton text = "Sign In" to = "/login" />);
    }
  }, [auth.authorized, auth.loading])
  
  return (
    <div className ="flex h-[8vh] 3xl:h-[8vh] 4xl:h-[6vh] w-full justify-between items-center border-b border-gray-200 border-solid py-5">
      <div className = "relative ml-20 md:ml-20 l:ml-24 xl:ml-36 2xl:ml-48 3xl:ml-60 4xl:ml-72">
        <LogoButton/>
      </div>

      <div className = "flex flex-grow justify-center">
        <NavButton text = "Technicals" href = "/questions"/>
        <NavButton text = "Resources" href = "/resources"/>
        <NavButton text = "Support" href = "/Support"/>
      </div>
      <div className = "mr-20 md:mr-20 l:mr-24 xl:mr-36 2xl:mr-48 3xl:mr-60 4xl:mr-72">
        {loginButton}
      </div>
    </div>
  )
}

export default NavBar;