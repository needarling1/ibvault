import { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import GoToQuestions from './GoToQuestions';
import Footer from '../Footer/Footer';
const Home = () => {
  useEffect(() => {
    document.title = 'Home - IB Vault';
  }, [])
  return (
    <div className = "flex flex-col w-full h-full">
        <NavBar/>
        <div className = "flex flex-col flex-grow relative justify-center items-center">
            <h1 className = "md:text-2xl l:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-5xl text-center p-4">Welcome to IB Vault</h1>
            <h2 className = "text-gray-500 md:text-md l:text-md xl:text-l 2xl:text-xl 3xl:text-xl 4xl:text-2xl text-center p-2">IB Vault features hundreds of technical investment banking questions, as well as an interactive grading system that utilizes OpenAI's latest GPT model.</h2>
            <GoToQuestions/>
        </div>
        <Footer/>
    </div>
  )
}

export default Home;