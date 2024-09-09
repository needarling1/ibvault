import axios from 'axios';


async function GetQuestion(id) {
    try {
        const response = await axios.get(`/api/questions/${id}`);

        return response.data;
      } catch (error) {
        console.error(error);
    }

}

export default GetQuestion;