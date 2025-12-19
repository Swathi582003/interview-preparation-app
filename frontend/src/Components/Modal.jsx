import React from 'react';

export const Modal = ({ children, isOpen, onClose, title, hideHeader }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-transparent'>
            <div className='relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md'>
                {!hideHeader && (
                    <div className='border-b border-white
'>
                        <h3 className='md:text-lg font-semibold'>{title}</h3>
                    </div>
                )}
                <button
                    type='button'
                    className='text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3 right-3.5 cursor-pointer'
                    onClick={onClose}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="w-3 h-3"
                    >
                        <path
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M1 1L13 13M13 1L1 13"
                        />
                    </svg>
                </button>
                <div className='p-4 flex-1 overflow-y-auto custom-scrollbar'>
                    {children}
                </div>

            </div>
        </div>
    );
};
