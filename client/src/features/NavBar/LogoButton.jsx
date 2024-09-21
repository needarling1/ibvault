import { Link } from 'react-router-dom';

const LogoButton = () => {
    return (
      <div>
        <Link className = "flex h-full overflow-hidden items-center relative text-start text-l md:text-l l:text-xl xl:text-xl 2xl:text-2xl 3xl:text-2xl 4xl:text-2xl py-3 cursor-pointer rounded-xl" to = "/">
        <img className = "h-[3vh] w-auto mx-1.5" src = "https://static-00.iconduck.com/assets.00/vault-icon-512x497-k48mdkzv.png" alt = "logo"/>
        IB Vault
        </Link>
      </div>
    )
  }
  
  export default LogoButton;