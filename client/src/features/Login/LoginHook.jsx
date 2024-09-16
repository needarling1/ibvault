import axios from 'axios';

async function LoginHook( {email, password} ) {
    try {
        const response = await axios.post('/api/login', {
            email: email,
            password: password
        });

        return response.data;
      } catch (error) {
        console.error(error);
    }

}

export default LoginHook;