import React, { useState, useRef } from 'react'
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu'

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const [previewUrl, setPreviewUrl] = useState(null)
  const inputRef = useRef(null)

  // Trigger file input click
  const triggerFileInput = () => {
    inputRef.current.click()
  }

  // Handle image file selection and generate preview URL
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImage(file)
      const previewURL = URL.createObjectURL(file)
      setPreview && setPreview(previewURL)
      setPreviewUrl(previewURL)
    }
  }

  // Remove selected image and reset preview
  const handleRemoveImage = () => {
    setImage(null)
    setPreview && setPreview(null)
    setPreviewUrl(null)
  }

  

  return (
    <div className="flex justify-center mb-6">
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* If no image is selected, show default user icon with upload button */}
      {!image ? (
        <div className="relative w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full shadow-md cursor-pointer hover:bg-orange-100 transition-colors duration-300">
          <LuUser className="text-4xl text-orange-500" />
          <button
            type="button"
            onClick={triggerFileInput}
            aria-label="Upload profile photo"
            className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full shadow-lg text-white hover:bg-orange-600 transition-colors duration-300"
          >
            <LuUpload size={18} />
          </button>
        </div>
      ) : (
        // When image is selected, show preview with trash (delete) button
        <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-md">
          <img
            src={preview || previewUrl}
            alt="Profile"
            className="w-full h-full object-cover cursor-pointer"
            onClick={triggerFileInput}
            title="Click to change photo"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer shadow-md hover:scale-105 transition-transform duration-200"
            aria-label="Remove photo"
            onClick={handleRemoveImage}
          >
            <LuTrash size={18} />
          </button>
        </div>
      )
      }
    </div >
  )
}

export default ProfilePhotoSelector
