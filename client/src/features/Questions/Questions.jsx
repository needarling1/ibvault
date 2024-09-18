import { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import GetQuestions from './GetQuestions';
import QuestionsList from './QuestionsList';
import Pagination from './Pagination';

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [completedQuestions, setCompletedQuestions] = useState(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(20)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchQuestions = async () => {
        try {
          const data = await GetQuestions();
          const completedArray = data.completed_questions;
          setQuestions(data.questions);
          setCompletedQuestions(new Set(completedArray));
        } catch (error) {
          setError(error.message || 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      fetchQuestions(); 
    }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  
  const currentPosts = questions.slice(firstPostIndex, lastPostIndex)
    
  return (
    <div className = "flex flex-col w-full h-full">
        <NavBar/>
        <div className = "flex flex-col relative top-10 items-center h-1/2">
            <h1 className = "text-4xl p-4">Practice IB Interview Questions</h1>
            <QuestionsList questions = {currentPosts} completedQuestions = {completedQuestions} />
            <Pagination 
                totalPosts = {questions.length}
                postsPerPage = {postsPerPage}
                setCurrentPage = {setCurrentPage}
                currentPage = {currentPage}
            />
        </div>
    </div>
  )
}

export default Questions;