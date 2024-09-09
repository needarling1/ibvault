import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import GetQuestion from './GetQuestion';


const Question = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
        <NavBar/>
        <h1>{question.id}. {question.question_name}</h1>

    </div>
  )
}

export default Question;