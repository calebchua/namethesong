'use client';
import React, { useState } from 'react';

// Props interface to organize button props
interface Props {
  children: React.ReactNode;
  changeSelect?: () => void;
  multiselect: boolean;
}

const Button: React.FC<Props> = ({ children, changeSelect, multiselect }) => {
  // selected state to toggle button appearance
  const [selected, useSelected] = useState<boolean>(false);

  return (
    <button
      onClick={() => {
          changeSelect;
          useSelected(!selected);
        }
      }
      className= {!selected ? "border-2 border-white rounded-md py-2 px-4 text-xl mx-2 hover:underline" 
      : "bg-white text-primary border-2 border-white rounded-md py-2 px-4 text-xl mx-2 hover:underline"}
    >
      {children}
    </button>
  )
}

export default Button
