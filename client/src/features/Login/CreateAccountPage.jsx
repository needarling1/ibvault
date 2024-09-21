import { useEffect } from "react";
import CreateAccount from "./CreateAccount";
import NavBar from "../NavBar/NavBar";

const CreateAccountPage = () => {
  useEffect(() => {
    document.title = 'Create Account - IB Vault';
  }, [])

  return (
    <div className="flex flex-col h-full">
        <NavBar/>
        <div className = "flex h-full w-full bg-gray-50 justify-center">
            <CreateAccount/>
        </div>
    </div>
  )
}

export default CreateAccountPage;