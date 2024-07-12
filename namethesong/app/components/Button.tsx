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
      className= {!isSelected ? "border-2 border-secondary rounded-md sm:py-2 py-1 sm:px-4 px-2 sm:text-xl text-sm sm:mx-2 mx-1 hover:underline" 
      : "bg-secondary text-primary border-2 border-secondary rounded-md sm:py-2 py-1 sm:px-4 px-2 sm:text-xl text-sm sm:mx-2 mx-1 hover:underline"}
    >
      {children}
    </button>
  )
}

export default Button
