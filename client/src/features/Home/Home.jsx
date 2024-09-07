import NavBar from '../NavBar/NavBar';
import GoToQuestions from './GoToQuestions';
const Home = () => {
  return (
    <div className = "flex flex-col w-full h-full">
        <NavBar/>
        <div className = "flex flex-col relative top-1/4 items-center h-1/2">
            <h1 className = "text-5xl p-4">Ace your next Investment Banking Interview.</h1>
            <span className = "text-xl p-4">BIWS is the optimal way to study for technical investment banking interviews, equipped with OpenAI's latest model for an interactive learning experience.</span>
            <GoToQuestions/>
        </div>
    </div>
  )
}

export default Home;