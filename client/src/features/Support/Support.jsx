import { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';

const Support = () => {
  useEffect(() => {
    document.title = 'Support - IB Vault';
  }, [])
  return (
    <div className="flex flex-col w-full h-full items-center">
      <NavBar />
      <div className="flex flex-col relative p-10 w-full max-w-4xl justify-center items-center text-center">  
        <h1 className="text-3xl mb-4">Contact Support</h1>
        <p className="text-lg mb-8">
          For inquiries, please contact at: <br />
          <a href="mailto:ibvaultsupport@gmail.com" className="text-blue-600 hover:underline">ibvaultsupport@gmail.com</a>
        </p>

        <p className="text-md text-gray-600 mb-10">
          Disclaimer: This is a free educational site. All of the questions and resources provided are from publicly available 3rd party sources on the internet. We do not claim ownership of the content and are not responsible for its accuracy or completeness.
        </p>

        <p className = "text-md text-gray-600">
        Copyright Disclaimer under section 107 of the Copyright Act 1976: allowance is made for “fair use” for purposes such as teaching and education.
        </p>
      </div>
    </div>
  );
}

export default Support;
