// ArrayInput.jsx
import React, { useState } from 'react';
import { Input } from './input';

export default function ArrayInput({ label, values, onChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
      setInputValue('');
    }
  };

  const handleRemove = (itemToRemove) => {
    onChange(values.filter((item) => item !== itemToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <label className="block font-semibold mb-1">{label}</label>
      <div className="flex gap-2 mb-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ajouter une ${label.toLowerCase()}`}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-primary text-gray-800 px-3 rounded"
        >
          Ajouter
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {values.map((item) => (
          <span
            key={item}
            className="bg-gray-200 rounded-full px-3 py-1 flex items-center gap-2"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemove(item)}
              className="text-red-500 font-bold"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
