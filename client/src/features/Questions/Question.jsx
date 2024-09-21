import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import GetQuestion from './GetQuestion';
import GradeQuestion from './GradeQuestion';
import CheckAuth from '../../hooks/CheckAuth';
import Footer from '../Footer/Footer';


const Question = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [answerLoading, setAnswerLoading] = useState(false);

  useEffect(() => {
    document.title = 'Questions - IB Vault';
  }, [])

  useEffect(() => {
      const checkUserAuth = async () => {
        const isAuth = await CheckAuth();
        setAuthorized(isAuth);
      };
      checkUserAuth();
  }, []);

  const maxChars = 1200;

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
  }

  
  if (loading) {
    return <div className = "flex w-full justify-center">Loading...</div>;
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
            <textarea value = {answer} maxLength={maxChars} onChange = {(e) => setAnswer(e.target.value)} className = "p-2 mt-10 h-72 w-1/2 4xl:w-1/3 border border-solid border-black focus:outline-none" placeholder = "Enter Answer..."/>
            <div className="w-1/2 4xl:w-1/3 text-right text-sm text-gray-600 mt-1">
              {maxChars - answer.length} characters left
            </div>
            <br />
            <button 
              type="submit" 
              className={`py-2 px-4 border border-black border-solid rounded-sm ${authorized ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-gray-400 text-gray-600 cursor-not-allowed'}`} 
              disabled={!authorized}
            >
              {authorized ? 'Submit' : 'Log in to submit answer'}
            </button>          
          </form>
          <div className = "mt-10">
            {answerLoading && <div className = "text-xl">Loading Result...</div>}
            {!answerLoading && result && <div className = "text-3xl">Result: {result}</div>}
          </div>
        </div>
        <Footer/>
    </div>
  );
}

export default Question;