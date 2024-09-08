const QuestionsList = ( {questions} ) => {
  return (
    <div>
      <table>
        <thead>
        <tr>
                <th scope="col">Title</th>
                <th scope="col">Topic</th>
                <th scope="col">Difficulty</th>
              </tr>
        </thead>
        <tbody>
            {questions.map((question, index) =>
              <tr key = {index}>
                <th scope="col">{question.question_name}</th>
                <th scope="col">{question.topic}</th>
                <th scope="col">{question.difficulty}</th>
              </tr>  
            )}
        </tbody>
      </table>
    </div>
  )
}

export default QuestionsList;