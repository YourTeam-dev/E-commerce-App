import React from 'react';
import { Star } from 'lucide-react';

function StarRatingFilter({ selected, onChange }) {
  return (
    <div className="flex flex-col space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className={`flex items-center px-2 py-1 border rounded space-x-1 ${
            selected === rating ? 'bg-[#d58a94] text-white' : ''
          }`}
        >
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill="currentColor"
              className="text-yellow-400"
            />
          ))}
          <span className="text-sm">& Up</span>
        </button>
      ))}
    </div>
  );
}

export default StarRatingFilter;
