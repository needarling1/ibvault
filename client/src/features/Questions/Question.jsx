import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import GetQuestion from './GetQuestion';
import GradeQuestion from './GradeQuestion';


const Question = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [answerLoading, setAnswerLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await GetQuestion(id); 
        setQuestion(data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswerLoading(true);

    let result = await GradeQuestion( {question_id: id, answer: answer} );
    setResult(result['result']);

    setAnswerLoading(false);
    setAnswer('');
  }

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className>
        <NavBar/>
        <div className = "flex flex-col items-center justify-center w-full">
          <h1 className = "text-3xl mt-6">{question.id}. {question.question_name}</h1>
          <h1 className = "text-2xl mt-12">{question.question}</h1>
          <form onSubmit = {handleSubmit} className = "flex flex-col items-center w-full" >
            <textarea value = {answer} onChange = {(e) => setAnswer(e.target.value)} className = "p-2 mt-10 h-72 w-1/3 border border-solid border-black focus:outline-none" placeholder = "Enter Answer..."/>
            <br />
            <button type="submit" className = "py-2 px-4 bg-gray-900 text-white hover:bg-gray-700 border border-black border-solid rounded-sm">Submit</button>
          </form>
          <div className = "mt-10">
            {answerLoading && <div className = "text-xl">Loading Result...</div>}
            {!answerLoading && result && <div className = "text-3xl">Result: {result}</div>}
          </div>
        </div>
    </div>
  );
}

export default Question;