import React from 'react';

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full max-w-xl mt-6">
      <div className="bg-gray-300 h-4 rounded-full overflow-hidden shadow-inner">
        <div
          className="bg-indigo-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center mt-2 text-gray-700 font-medium">Progreso: {Math.round(progress)}%</p>
    </div>
  );
}
