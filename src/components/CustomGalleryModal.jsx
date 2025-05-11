import React from 'react';

export default function CustomGalleryModal({ onClose, onVideoSelect }) {
  const items = [
    { id: 1, type: 'image', src: '/img/baby1.jpg' },
    { id: 2, type: 'image', src: '/img/baby2.jpg' },
    { id: 3, type: 'video', src: '/videos/babyextra.mp4' },
    { id: 4, type: 'video', src: '/videos/shotextra.mp4' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-4 max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="grid grid-cols-2 gap-4">
          {items.map(item => (
            item.type === 'image' ? (
              <img key={item.id} src={item.src} alt="" className="w-full h-auto rounded-md" />
            ) : (
              <button key={item.id} onClick={() => onVideoSelect(item.src)} className="bg-gray-200 p-4 rounded-md hover:bg-gray-300">
                Ver video
              </button>
            )
          ))}
        </div>
        <div className="text-right mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Cerrar</button>
        </div>
      </div>
    </div>
  );
}
