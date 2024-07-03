"use client"
import React, { useEffect, useState } from "react"

// Props interface to organize setting label props
interface Props {
  children: React.ReactNode;
}

// convert text from camel case form to how text is normally displayed
function convertText(text: any) {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
}

const SettingLabel: React.FC<Props> = ({ children }) => {
  return (
    <div className="border-2 border-secondary rounded-3xl px-4 text-lg mx-1">
      {convertText(children)}
    </div>
  )
}

export default SettingLabel
