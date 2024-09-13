import CreateAccount from "./CreateAccount";
import NavBar from "../NavBar/NavBar";

const CreateAccountPage = () => {
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