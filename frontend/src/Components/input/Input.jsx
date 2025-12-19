import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, onChange, label, placeholder, type, error }) => {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);


  // Function to toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div>
      {/* Label for the input field */}
      <label>{label}</label>

      {/* Wrapper div for input and eye icon */}
      <div className="relative">
        {/* Input field with dynamic type based on password visibility */}
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
        />

        {/* Eye icon toggle for password input */}
        {type === "password" && (
          showPassword ? (
            <FaRegEyeSlash
              size={22}
              className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-400"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEye
              size={22}
              className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-400"
              onClick={toggleShowPassword}
            />
          )
        )}
        {error && <p className=''>{error}</p>}

        
      </div>
    </div>
  );
};

export default Input;