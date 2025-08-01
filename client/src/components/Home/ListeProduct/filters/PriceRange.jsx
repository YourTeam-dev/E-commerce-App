import React from 'react';

function PriceRangeSlider({ min, max, value, onChange }) {
  const handleMin = (e) => onChange([+e.target.value, value[1]]);
  const handleMax = (e) => onChange([value[0], +e.target.value]);

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
      <div className="flex space-x-2 items-center">
        <label >Min</label>
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={handleMin}
          className="w-full"
        />
      </div>
      <div className="flex space-x-2 items-center">
        <label >Max</label>
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleMax}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default PriceRangeSlider;
