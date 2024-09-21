import { Link } from 'react-router-dom';
const GoToQuestions = () => {
  return (
    <div>
      <Link to = "/questions" className = "relative p-3 xl:p-4 2xl:p-6 3xl:p-6 top-10 bg-gray-900 border hover:bg-gray-700 border-solid border-black rounded-xl cursor-pointer text-4xl text-white">Start Solving Now</Link>
    </div>
  )
}

export default GoToQuestions;