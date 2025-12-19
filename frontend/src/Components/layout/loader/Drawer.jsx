import React from 'react';

const Drawer = ({ isOpen, onClose, title, children }) => { // <--- Add 'children' to props

  if (!isOpen) {
    return null; // Don't render anything if the drawer is closed
  }

  return (
    // You'll likely need proper styling for a drawer,
    // e.g., fixed position, full screen overlay, etc.
    // This is a basic structure.
    <div className="drawer-overlay fixed inset-0 bg-transparent bg-opacity-50 z-40" onClick={onClose}>
      {/* Prevent clicks on the content from closing the drawer */}
      <div
        className="drawer-content fixed right-0 top-0 h-full bg-white w-3/4 md:w-1/3 shadow-lg p-6 z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing when clicking inside
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-semibold text-gray-800">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times; {/* Close button (an 'x') */}
          </button>
        </div>
        <div className="drawer-body">
          {children} {/* <--- THIS IS WHERE YOUR AIResponsePreview WILL RENDER! */}
        </div>
      </div>
    </div>
  );
};

export default Drawer;