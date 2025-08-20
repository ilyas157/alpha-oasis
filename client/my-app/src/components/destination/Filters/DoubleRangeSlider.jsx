import { useState } from 'react';

const DoubleRangeSlider = ({ min = 0, max = 1000, step = 10, onChange }) => {
  const [range, setRange] = useState({ minValue: min, maxValue: max });

  const handleMinChange = (e) => {
    const value = Math.min(+e.target.value, range.maxValue - step);
    setRange((prev) => ({ ...prev, minValue: value }));
    onChange?.({ min: value, max: range.maxValue });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(+e.target.value, range.minValue + step);
    setRange((prev) => ({ ...prev, maxValue: value }));
    onChange?.({ min: range.minValue, max: value });
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="relative h-10">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range.minValue}
          onChange={handleMinChange}
          className="range range-xs absolute w-full z-20 pointer-events-none accent-blue-500"
          style={{ pointerEvents: 'auto' }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range.maxValue}
          onChange={handleMaxChange}
          className="range range-xs absolute w-full z-10 pointer-events-none accent-blue-500"
          style={{ pointerEvents: 'auto' }}
        />
      </div>

      <div className="flex justify-between mt-4">
        <span className="text-sm font-medium">{range.minValue} MAD</span>
        <span className="text-sm font-medium">{range.maxValue} MAD</span>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
