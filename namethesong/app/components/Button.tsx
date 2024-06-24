'use client';
import React, { DetailedHTMLProps } from 'react';

interface Props {
  children: React.ReactNode;
  changeSelect?: () => void;
}

const Button: React.FC<Props> = ({ children, changeSelect }) => {
  return (
    <button
      onClick={changeSelect}
      className="border-2 border-white rounded-md py-2 px-4 text-xl mx-2 hover:underline"
    >
      {children}
    </button>
  )
}

export default Button
