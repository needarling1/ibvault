import axios from 'axios';

async function CreateAccountHook( {email, password} ) {
    try {
        const response = await axios.post('/api/register', {
            email: email,
            password: password
        });

        return response.data;
      } catch (error) {
        console.error(error);
    }

}

export default CreateAccountHook;