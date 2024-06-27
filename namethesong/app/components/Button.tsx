"use client";
import React from "react";

// Props interface to organize button props
interface Props {
  children: React.ReactNode;
  changeSelect: () => void;
  selected: boolean;
}

const Button: React.FC<Props> = ({ children, changeSelect, selected }) => {
  let isSelected: boolean = selected;

  return (
    <button
      onClick={changeSelect}
      className= {!isSelected ? "border-2 border-white rounded-md py-2 px-4 text-xl mx-2 hover:underline" 
      : "bg-white text-primary border-2 border-white rounded-md py-2 px-4 text-xl mx-2 hover:underline"}
    >
      {children}
    </button>
  )
}

export default Button
