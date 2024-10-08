import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import instance from '../../hooks/AxiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import CreateAccountHook from './CreateAccountHook';
import LoginHook from './LoginHook';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    let response = await CreateAccountHook( {email: email, password: password});

    if (response.message === 'User created successfully.') {
      await LoginHook( {email: email, password: password} );
      navigate('/');
    } else {
      setError(<div className = "text-red-600">{response.message}</div>)
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
        try {
            const response = await instance.post('/google-login', {
                code: codeResponse,
            });
            if (response.status === 200) {
              return navigate("/");
            }
            } catch (error) {
            console.error('Error logging in with Google', error);
            }
        },
        onError: error => {
            console.error('Google login failed', error);
        },
    });

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <form
          className="bg-white shadow-md rounded px-8 py-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <button
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            type="submit"
          >
            Sign Up
          </button>

          {error}

          <div className="mt-6">
            <button
              type="button"
              onClick={() => handleGoogleLogin()}
              className="w-full flex items-center justify-center border border-gray-300 rounded py-2 px-4 hover:bg-gray-100 transition duration-200"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
