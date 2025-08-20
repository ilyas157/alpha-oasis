import React from 'react';
import Navbar from '../components/Navbar';
import NeoFooter from '../components/NeoFooter';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className=" flex flex-col min-h-screen">
        <Navbar />
        <main className=" pt-[145px]  my-5 flex flex-col items-center justify-center flex-grow px-4 text-center">
          <h1 className="text-7xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-medium text-gray-600 mb-8">
            Oops! The page you’re looking for doesn’t exist.
          </h2>
          <img
            src="https://i.pinimg.com/736x/96/4f/56/964f56fdc6ccef4a5406ced7b3d9f949.jpg"
            alt="Not Found Illustration"
            className="max-w-md w-full rounded-xl shadow-md mb-8"
          />
          <button
            onClick={() => navigate('/')}
            className="btn bg-primary inline-flex gap-5 items-center text-gray-700 px-6 py-3 rounded-lg shadow transition-colors duration-200"
          >
            <ArrowLeft className='h-5 w-5'/>Back to Home
          </button>
        </main>
        <NeoFooter />
      </div>
    </>
  );
}

export default NotFound;
