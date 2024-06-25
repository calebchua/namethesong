'use client';
import React from 'react';

// Props interface to organize radio button props
interface Props {
  value: string;
  changeSelect: () => void;
}

const RadioButton: React.FC<Props> = ({ value, changeSelect }) => {
  return (
    // <button
    //   onClick={changeSelect}
    //   className= {!isSelected ? "border-2 border-white rounded-md py-2 px-4 text-xl mx-2 hover:underline" 
    //   : "bg-white text-primary border-2 border-white rounded-md py-2 px-4 text-xl mx-2 hover:underline"}
    // >
    //   {children}
    // </button>
    <input
      value={value} 
      type="radio"
    >
    </input>
  )
}

export default RadioButton
