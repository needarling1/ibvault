import instance from "../../hooks/AxiosInstance";


async function GetQuestions() {
    try {
        const response = await instance.get('/questions');

        return response.data;
      } catch (error) {
        console.error(error);
    }

}

export default GetQuestions;