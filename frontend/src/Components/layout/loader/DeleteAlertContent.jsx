import React from 'react';

const DeleteAlertContent = ({ content, onDelete, onCancel }) => {
    return (
        <div className='p-6 sm:p-5 bg-trasnparent rounded-lg shadow-xl max-w-sm mx-auto relative overflow-hidden'> {/* Fixed: relative and overflow-hidden */}
            <h3 className=" text-sx md:text-xl font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
            <p className='text-base text-gray-700 leading-relaxed mb-6'>
                {content}
            </p>

            <div className='flex justify-end gap-3 sm:gap-4'>

                <button
                    type='button'
                    className='px-5 py-2.5 text-base font-medium text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-200'
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlertContent;
