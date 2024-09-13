import NavBar from '../NavBar/NavBar';
import GoToQuestions from './GoToQuestions';
const Home = () => {
  return (
    <div className = "flex flex-col w-full h-full">
        <NavBar/>
        <div className = "flex flex-col relative justify-center items-center h-3/4">
            <h1 className = "md:text-2xl l:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-5xl text-center p-4">Welcome to IB Vault</h1>
            <GoToQuestions/>
        </div>
    </div>
  )
}

export default Home;