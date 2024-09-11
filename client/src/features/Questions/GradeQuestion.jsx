import axios from 'axios';

async function GradeQuestion( {question_id, answer} ) {
    try {
        const response = await axios.post('/api/questions/grade', {
            question_id: question_id,
            answer: answer
        });

        return response.data;
      } catch (error) {
        console.error(error);
    }

}

export default GradeQuestion;