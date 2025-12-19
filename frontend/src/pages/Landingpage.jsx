import React, { useContext, useState } from 'react';
import HERO_IMG from '../assets/hero-img.jpg'; // Assuming you plan to use this image
import { useNavigate } from 'react-router-dom';
import { APP_FEATURES } from '../utils/data'; // Make sure this path is correct
import { LuSparkles } from 'react-icons/lu';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import { Modal } from '../Components/Modal';
import { UserContext } from '../context/useContext';
import ProfileinfoCard from '../context/Cards/ProfileinfoCard';

const Landingpage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-yellow-100 relative overflow-hidden">
        {/* Blurred Background Circle - This is a design element */}
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />

        {/* Main Content Wrapper: Removed 'container' and 'mx-auto'
          Using responsive 'px' (padding-x) for left/right spacing */}
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 pt-6 pb-28 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-10 md:mb-16">
            <h1 className="text-xl font-bold text-gray-800">Interview Prep AI</h1>
            {user ? (
              <ProfileinfoCard />
            ) : (
              <button
                className="bg-amber-600 hover:bg-black text-sm font-semibold text-white px-6 py-2.5 rounded-full transition-colors"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
            {/* Left Text Content */}
            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-2 text-xs text-amber-600 font-semibold bg-amber-200 px-3 py-1 rounded-full border border-amber-300 mb-4">
                <LuSparkles /> AI Powered
              </div>
              <h1 className="text-4xl md:text-4xl font-bold text-black leading-tight mb-6 sm:items-center justify-center">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] animate-text-shine">
                  AI-Powered
                </span>{' '}
                Learning
              </h1>
            </div>

            {/* Right Description + CTA */}
            <div className="w-full md:w-1/2">
              <p className="text-base text-gray-1000 leading-relaxed mb-2 text-[17px] md:mr-6 text-bold">
                Get role-specific questions, expand answers when needed, dive deeper into concepts, and organize everything your way.
                From preparation to mastery – your ultimate interview toolkit is here.
              </p>

              {/* CTA Button Alignment */}
              <div className="flex justify-end md:justify-start">
                <button
                  className="bg-black text-xl font-semibold text-white px-7 py-2 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors"
                  onClick={handleCTA}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className='w-full min-h-full relative z-10 mb-12 '>
        <div>
          <section className='flex items-center justify-center -mt-36'>
            <img src={HERO_IMG}
              alt='hero image'
              className='w-[80vw] rounded-lg'
            />
          </section >
        </div>
      </div>

      {/* Features Section */}
      <div className='w-full min-h-full bg-[#FFFCEF] mt-10'>
        <div className='container mx-auto px-4 pt-10 pb-20'>
          <section className='mt-5'>
            <h2 className='text-2xl font-medium text-center mb-12'>
              Features that Make You Shine
            </h2>

            <div className='flex flex-col items-center gap-8'>
              {/* First 3 cards grid */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
                {APP_FEATURES.slice(0, 3).map((feature) => ( // Render first 3 features
                  <div
                    key={feature.id}
                    className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-200 transition border border-amber-100'
                  >
                    <h3 className='text-base font-semibold mb-3'>
                      {feature.title}
                    </h3>
                    <p className='text-gray-600'>{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Remaining cards grid */}
              {/* Ensure there are remaining features before rendering this div */}
              {APP_FEATURES.length > 3 && (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'> {/* Adjusted md:grid-cols-2 to md:grid-cols-2 for clarity */}
                    {APP_FEATURES.slice(3).map((feature) => ( // Render remaining features
                      <div
                        key={feature.id}
                        className='bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-200 transition border border-amber-100'
                      >
                        <h3 className='text-base font-semibold mb-3'>
                          {feature.title}
                        </h3>
                        <p className='text-gray-600'>{feature.description}</p>
                      </div>
                    ))}
                  </div>
              )}
            </div>
          </section>
        </div>
      </div>

      <div className='text-sm bg-gray-50 text-secondary text-center p-5 mt-5'>
        Made with ❤️... Akash kumar Mern Stack Developer
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage('login');
        }}
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default Landingpage;