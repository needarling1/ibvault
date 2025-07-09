import { Link } from 'react-router-dom';

const LogoButton = () => {
    return (
      <div>
        <Link className = "flex h-full overflow-hidden items-center relative text-start text-l md:text-l l:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl 4xl:text-2xl py-3 cursor-pointer rounded-xl" to = "/">
        IB Vault
        </Link>
      </div>
    )
  }
  
  export default LogoButton;
