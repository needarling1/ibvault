import { Link } from 'react-router-dom';

const LoginButton = ( {text, to, onClick} ) => {

    return (
      <div>
        <Link className = "relative text-start text-l md:text-l l:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl 4xl:text-2xl py-3 px-7 text-white cursor-pointer bg-gray-900 border hover:bg-gray-700 rounded-xl" to = {to} onClick = {onClick}>{text}</Link>
      </div>
    )
  }
  
  export default LoginButton;