import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';
const SummaryCard = ({
  color,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      // Adjusted overall padding to make the card appear more compact
      className='bg-white border border-gray-300/40 rounded-xl p-3 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group'
      onClick={onSelect}
    >
      <div
        // Reduced padding here slightly for a more compact top section
        className='rounded-lg p-3 relative'
        style={{ background: color.bgcolor }}
      >
        <div className='flex items-start'>
          <div className='flex-shrink-0 w-10 h-10 bg-white rounded-md flex items-center justify-center mr-3'> {/* Slightly smaller icon */}
            <span className='text-base font-semibold text-black'>{getInitials(role)}</span> {/* Adjusted font size */}
          </div>
        </div>
        {/* Content Container */}
        <div className='flex-grow'>
          <div className='flex justify-between items-start'>
            {/* Title and skills */}
            <div>
              <h2 className='text-base font-medium'>{role}</h2> {/* Slightly smaller title */}
              <p className='text-xs text-medium text-gray-900'>
                {topicsToFocus}
              </p>
            </div>
          </div>
        </div>
        <button
          className='hidden group-hover:flex items-center gap-1 text-[10px] text-rose-500 font-medium px-2 py-0.5 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-2 right-2' // Smaller button for delete
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 />
        </button>
      </div>

      <div className='px-2 pb-2'> {/* Reduced padding for the bottom section */}
        <div className='flex items-center gap-2 mt-3 flex-wrap'> {/* Adjusted gap and added flex-wrap */}
          <div className='text-[9px] font-medium text-black px-2 py-0.5 border-[0.5px] border-gray-900 rounded-full'> {/* Smaller text and padding for chips */}
            Experience {experience} {experience === 1 ? 'Year' : 'Years'}
          </div>
          <div className='text-[9px] font-medium text-black px-2 py-0.5 border-[0.5px] border-gray-900 rounded-full'>
            {questions} Q&A
          </div>
          <div className='text-[9px] font-medium text-black px-2 py-0.5 border-[0.5px] border-gray-900 rounded-full'>
            Last Updated: {lastUpdated}
          </div>
        </div>
        {/* Description */}
        <p className='text-[11px] text-gray-500 font-medium line-clamp-2 mt-2'> {/* Slightly smaller description text and less margin */}
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;