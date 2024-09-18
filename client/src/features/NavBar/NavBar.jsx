import { useState, useEffect, useRef } from 'react';
import CheckAuth from '../../hooks/CheckAuth';
import NavButton from './NavButton'
import LoginButton from './LoginButton';
import LogoButton from './LogoButton';
import { useNavigate } from 'react-router-dom';

import instance from '../../hooks/AxiosInstance';

const NavBar = () => {
  const [auth, setAuth] = useState({
    authorized: false,
    loading: true
  })

  const [loginButton, setLoginButton] = useState(<LoginButton text = "Login" to = "/login" />)

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await instance.post('/api/logout');
      setAuth({authorized: false, loading: true});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const authorization = async () => {
      const response = await CheckAuth();
      setAuth({authorized: response, loading: false});
    }
    authorization();
  }, []);

  useEffect(() => {
    if (auth.authorized) {
      setLoginButton(<LoginButton text = "Sign Out" onClick = {handleLogout}/>);
    } else {
      setLoginButton(<LoginButton text = "Sign In" to = "/login" />);
    }
  }, [auth.authorized])
  
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
        {loginButton}
      </div>
    </div>
  )
}

export default NavBar;