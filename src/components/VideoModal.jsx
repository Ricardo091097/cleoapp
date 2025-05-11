// components/VideoModal.jsx
import React from 'react';

export default function VideoModal({ videoUrl, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl overflow-hidden max-w-md w-full shadow-2xl" style={{ maxWidth: '25rem', width: '100%' }}>
        <video src={videoUrl} controls autoPlay className="w-full" />
        <div className="p-4 text-right bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
