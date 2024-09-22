import instance from "../../hooks/AxiosInstance";

async function LoginHook( {email, password} ) {
    try {
        const response = await instance.post('/login', {
            email: email,
            password: password
        });

        return response;
      } catch (error) {
        return error;
    }

}

export default LoginHook;