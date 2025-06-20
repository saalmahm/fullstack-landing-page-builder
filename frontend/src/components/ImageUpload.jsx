import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageUpload({ value, onChange, preview }) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(value || '');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
        onChange(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  return (
    <div className="flex flex-col items-center space-y-4">
      {preview && (
        <div className="w-64 h-64 relative">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2">
            <button
              onClick={() => {
                setFile(null);
                setImageUrl('');
                onChange('');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
      <div 
        {...getRootProps()}
        className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 hover:border-blue-500"
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <UploadOutlined className="text-4xl text-gray-400 mb-2" />
          <p className="text-gray-600">Glissez-déposez une image ici, ou cliquez pour sélectionner</p>
        </div>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center space-x-2">
        <UploadOutlined />
        <span>Uploader une image</span>
      </button>
    </div>
  );
}
