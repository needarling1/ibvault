import instance from "../../hooks/AxiosInstance";

async function CreateAccountHook( {email, password} ) {
    try {
        const response = await instance.post('/register', {
            email: email,
            password: password
        });

        return response.data;
      } catch (error) {
        return error.response.data;
    }

}

export default CreateAccountHook;