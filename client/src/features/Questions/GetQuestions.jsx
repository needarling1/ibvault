import axios from 'axios';


async function GetQuestions() {
    try {
        const response = await axios.get('/api/questions');

        return response.data;
      } catch (error) {
        console.error(error);
    }

}

export default GetQuestions;