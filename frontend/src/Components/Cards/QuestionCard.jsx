import React, { useEffect, useRef, useState } from 'react';
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu';
import AIResponsePreview from '../AIResponsePreview';
const QuestionCard = ({
    question, // Changed to 'question' (singular) to match the parent component's usage.
    answer,
    onLearnMore,
    isPinned,
    onTogglePin
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            // Set a slight delay or use requestAnimationFrame if scrollHeight is not immediately accurate
            // or if content rendering is dynamic. For simple text, it should be fine.
            const ContentHeight = contentRef.current.scrollHeight;
            setHeight(ContentHeight + 20); // Added more padding when expanded
        } else {
            setHeight(0);
        }
    }, [isExpanded, answer]); // Add 'answer' to dependency array if its content can change dynamically

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // console.log("Question prop received (QuestionCard):", question); // Keep for debugging if needed

    return (
        <div className='bg-white rounded-lg mb-4 overflow-hidden py-4 px-5 shadow-lg shadow-gray-200 border border-gray-100 group transition-all duration-300 ease-in-out'>
            <div className='flex items-center justify-between cursor-pointer'>
                {/* Left Section: Pin Icon and Question */}
                <div
                    className='flex items-start gap-3.5 flex-1'
                    onClick={toggleExpand} // Make the whole question area clickable to expand
                >
                    {/* Pin Icon with sparkle for pinned state */}
                    <span className='flex-shrink-0 text-gray-400 mt-0.5'>
                        {isPinned ? (
                            <LuSparkles size={18} className='text-yellow-500' /> // Yellow for pinned sparkle
                        ) : (
                            <LuPin size={18} className='text-gray-400' /> // Default pin icon
                        )}
                    </span>

                    {/* Question Title */}
                    <h3 className='flex-1 text-base md:text-lg font-semibold text-gray-800 leading-tight pr-2'>
                        {question}
                    </h3>
                </div>

                {/* Right Section: Action Buttons (Pin/Unpin, Learn More/Expand) */}
                <div className='flex items-center gap-2 flex-shrink-0'>
                    {/* Toggle Pin Button */}
                    <button
                        className='p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300'
                        onClick={onTogglePin}
                        aria-label={isPinned ? "Unpin question" : "Pin question"}
                    >
                        {isPinned ? (
                            <LuPinOff size={20} />
                        ) : (
                            <LuPin size={20} />
                        )}
                    </button>

                    {/* Learn More / Expand Button */}
                    <button
                        className='p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300'
                        onClick={() => {
                            setIsExpanded(true); // Ensure it expands when "Learn More" is clicked
                            onLearnMore();
                        }}
                        aria-label="Learn more about this question"
                    >
                        <LuSparkles // Using LuSparkles for "Learn More" button
                            size={20}
                            className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180 text-blue-500" : ""}`} // Rotate on expand, add blue color
                        />
                    </button>

                    {/* Collapse/Expand Chevron */}
                    <button
                        className='p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ml-1'
                        onClick={toggleExpand}
                        aria-label={isExpanded ? "Collapse answer" : "Expand answer"}
                    >
                        <LuChevronDown
                            size={20}
                            className={`transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>
            </div>

            {/* Collapsible Answer Section */}
            <div
                className='transition-all duration-300 ease-in-out overflow-hidden'
                style={{ maxHeight: `${height}px` }}
            >
                <div
                    ref={contentRef}
                    className='pt-3 text-gray-700 leading-relaxed border-t border-gray-100 mt-3' // Added top border and padding
                >
                    <AIResponsePreview content={answer}/>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;