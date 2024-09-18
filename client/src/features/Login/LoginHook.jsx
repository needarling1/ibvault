import instance from "../../hooks/AxiosInstance";

async function LoginHook( {email, password} ) {
    try {
        const response = await instance.post('/api/login', {
            email: email,
            password: password
        });

        return response.data;
      } catch (error) {
        return error;
    }

}

export default LoginHook;