import React from 'react';

export default function CardGrid({ cards, onCardClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 w-full max-w-6xl">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => onCardClick(card.id, card.video)}
          className="card cursor-pointer rounded-2xl overflow-hidden shadow-xl bg-cover bg-center h-52 relative transform hover:scale-105 transition duration-300"
          style={{ backgroundImage: `url(${card.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-bold drop-shadow-lg text-center px-2">
              {card.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
