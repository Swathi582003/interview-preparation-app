import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For tables, strikethrough, task lists, etc.

const AIResponsePreview = ({ content }) => {
    // Ensure content is always treated as a string to prevent potential React errors.
    const displayContent = String(content || '').trim();

    // If content is null, undefined, or empty after trimming, return nothing.
    if (!displayContent) {
        return null;
    }

    return (
        <div
            className='w-full px-4 py-6 sm:px-6 lg:px-8
                       bg-white text-gray-800 rounded-lg shadow-sm border border-gray-100
                       overflow-x-auto custom-scroll-bar markdown-content text-[15px] leading-relaxed break-words' // <-- Moved className here
        >
            <ReactMarkdown
                // REMOVED: className='markdown-content text-[15px] leading-relaxed break-words'
                remarkPlugins={[remarkGfm]}
                components={{
                    // Custom rendering for paragraphs to add bottom margin
                    p: ({ node, ...props }) => <p className="mb-4" {...props} />,

                    // Custom rendering for headings (optional, but good for consistent styling)
                    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 mt-5" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mb-2 mt-4" {...props} />,

                    // Custom rendering for lists
                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4" {...props} />,
                    li: ({ node, ...props }) => <li className="mb-1" {...props} />,


                    // Crucial for tables:
                    table: ({ node, ...props }) => (
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 mb-4">
                            {props.children}
                        </table>
                    ),
                    thead: ({ node, ...props }) => (
                        <thead className="bg-gray-100">
                            {props.children}
                        </thead>
                    ),
                    tbody: ({ node, ...props }) => (
                        <tbody className="bg-white divide-y divide-gray-200">
                            {props.children}
                        </tbody>
                    ),
                    tr: ({ node, ...props }) => (
                        <tr className="hover:bg-gray-50">
                            {props.children}
                        </tr>
                    ),
                    th: ({ node, ...props }) => (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">
                            {props.children}
                        </th>
                    ),
                    td: ({ node, ...props }) => (
                        <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-900 border-b border-gray-300">
                            {props.children}
                        </td>
                    ),

                    // Ensure strong and emphasis (bold/italic) are rendered as expected
                    strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                    em: ({ node, ...props }) => <em className="italic" {...props} />,

                    // For horizontal rules (the "---" or "***" that shouldn't show)
                    hr: ({ node, ...props }) => <hr className="my-6 border-t-2 border-gray-200" {...props} />,
                }}
            >
                {displayContent}
            </ReactMarkdown>
        </div>
    );
};

export default AIResponsePreview;