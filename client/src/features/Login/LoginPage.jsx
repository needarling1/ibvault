import LoginComponent from "./LoginComponent";
import NavBar from "../NavBar/NavBar";

const LoginPage = () => {
  return (
    <div className="flex flex-col h-full">
        <NavBar/>
        <div className = "flex h-full w-full bg-gray-50 justify-center">
            <LoginComponent/>
        </div>
    </div>
  )
}

export default LoginPage;