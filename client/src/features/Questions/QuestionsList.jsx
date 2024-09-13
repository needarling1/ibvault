import { Link } from 'react-router-dom'

const QuestionsList = ( {questions} ) => {
  return (
    <div>
      <table>
        <thead>
        <tr className = "border border-black border-solid bg-gray-900 text-white">
                <th scope="col" key="extra-column" aria-label="links" className = "w-0 h-0"></th>
                <th scope="col" className = "text-xl font-normal px-4 py-2">Status</th>
                <th scope="col" className = "text-xl font-normal pl-4 pr-96 py-2">Title</th>
                <th scope="col" className = "text-xl font-normal pl-4 pr-32 py-2">Topic</th>
                <th scope="col" className = "text-xl font-normal pl-4 pr-10 py-2">Difficulty</th>
              </tr>
        </thead>
        <tbody>
            {questions.map((question) =>
              <tr key = {question.id} className = "relative border border-black border-solid cursor-pointer hover:bg-gray-100">
                    <td>
                        <Link to = {`/questions/${question.id}`} className = 'absolute top-0 left-0 w-full h-full z-10'></Link>
                    </td>
                    <td scope="col" className = "text-xl pl-4 py-2">To-Do</td>
                    <td scope="col" className = "text-xl pl-4 py-2">{question.question_name}</td>
                    <td scope="col" className = "text-xl pl-4 py-2">{question.topic}</td>
                    <td scope="col" className = "text-xl pl-4 py-2">{question.difficulty}</td>

              </tr>  
            )}
        </tbody>
      </table>
    </div>
  )
}

export default QuestionsList;/*
onClick={() => window.location.href = `/questions/${question.id}`} */