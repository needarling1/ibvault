import instance from "../../hooks/AxiosInstance";


async function GetQuestion(id) {
    try {
        const response = await instance.get(`/questions/${id}`);

        return response.data;
      } catch (error) {
        console.error(error);
    }

}

export default GetQuestion;