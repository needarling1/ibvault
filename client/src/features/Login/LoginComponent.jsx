import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import instance from '../../hooks/AxiosInstance';
import CheckAuth from '../../hooks/CheckAuth';
import LoginHook from './LoginHook';
import { AuthContext } from '../../hooks/AuthContext';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.authorized) {
      navigate("/questions");
    }
  }, [auth.authorized, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await LoginHook({ email: email, password: password });
      if (response && response.status === 200) {
        setAuth({ authorized: true, loading: false });
        navigate('/questions');
      } else {
        setResult(response);
        setPassword('');
        setError(<div className="text-red-600">Invalid Credentials</div>);
      }
    } catch (error) {
      setError(<div className="text-red-600">An error occurred</div>);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const response = await instance.post('/google-login', {
          code: codeResponse,
        });
        if (response && response.status === 200) {
          setAuth({ authorized: true, loading: false });
          navigate('/questions');
        }
      } catch (error) {
        console.error('Error logging in with Google', error);
        setError(<div className="text-red-600">Google login failed</div>);
      }
    },
    onError: (error) => {
      console.error('Google login failed', error);
      setError(<div className="text-red-600">Google login failed</div>);
    },
  });

  if (result) {
    console.log(result);
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <form
          className="bg-white shadow-md rounded px-8 py-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

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
            Sign In
          </button>

          {error}

          <div className="mt-4 flex items-center justify-between">
            <Link to="/create-account" className="text-sm text-blue-500 hover:underline">
              Create an account
            </Link>
            <Link href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

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
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
