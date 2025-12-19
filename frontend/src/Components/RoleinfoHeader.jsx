import React from 'react';
import { CARD_BG } from '../utils/data'; // Assuming COMPONENT_COLORS is defined here
// import { getInitials } from '../utils/helpers'; // Assuming this helper function is available

const RoleinfoHeader = ({ role, topicsToFocus, experience, questions, description, lastUpdatted }) => {

    // Define getInitials here if it's not imported from a utility file
    const getInitials = (name) => {
        if (!name) return '';
        const words = name.split(' ');
        if (words.length > 1) {
            return (words[0][0] + words[1][0]).toUpperCase();
        }
        return words[0][0].toUpperCase();
    };

    return (
        <div className='relative overflow-hidden'>

            {/* Main header content wrapper, acting as the "card" */}
            <div
                // CHANGES HERE:
                // max-w-6xl - remains to control overall width
                // md:ml-0 md:mr-auto - This combination will push it to the left on medium screens and up.
                // You can experiment with md:ml-[custom_value] if you want a specific offset from left.
                // If you want it closer to the left edge of the content, remove md:px-6 lg:px-8 from the card itself
                // and keep it only on the outer container if you have one.
                className='rounded-lg p-6 relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8
                           md:ml-0 md:mr-auto md:max-w-7xl' // Adjust max-w if you want it wider when left-aligned
                style={{ background: CARD_BG.bgcolor }} // Assuming CARD_BG is an object with bgcolor
            >
                {/* Top Section: Icon, Role, and Topics */}
                <div className='flex items-start mb-6'>

                    {/* Role Initial Icon */}
                    <div className='flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mr-4 sm:mr-6 shadow-md'>
                        <span className='text-xl sm:text-2xl font-bold text-blue-600'>
                            {getInitials(role)}
                        </span>
                    </div>

                    {/* Role Title and Topics */}
                    <div className='flex-grow'>
                        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-2'>
                            {role || 'Job Role'}
                        </h1>
                        {topicsToFocus && (
                            <p className='text-base sm:text-lg text-gray-700'>
                                <span className='font-semibold'>Focus Areas:</span> {topicsToFocus}
                            </p>
                        )}
                        {description && (
                            <p className='text-sm sm:text-base text-gray-600 mt-3 max-w-3xl'>
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Information Badges */}
                <div className='flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-gray-200'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                        Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
                    </span>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'>
                        Questions: {questions} Q&A
                    </span>
                    {lastUpdatted && (
                        <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800'>
                            Last Updated: {lastUpdatted}
                        </span>
                    )}
                </div>
            </div>

            {/* Color Blob Effects on the right side - these are outside the card background */}
            <div className='absolute top-0 right-0 w-2/5 h-full flex items-center justify-center pointer-events-none'>
                <div className='w-24 h-24 bg-lime-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob-slow absolute top-1/4 right-1/4' />
                <div className='w-28 h-28 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob-slow animation-delay-2000 absolute top-1/2 left-1/4' />
                <div className='w-20 h-20 bg-cyan-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob-slow animation-delay-4000 absolute bottom-1/4 right-1/3' />
            </div>
        </div>
    );
};

export default RoleinfoHeader;