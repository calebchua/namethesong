'use client';
import React, { DetailedHTMLProps } from 'react'

type Props = DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {}

const Button = ( props: Props ) => {
  return (
    <button className="border-2 border-white rounded-md py-2 px-4 text-xl mx-2 hover:underline" {...props}/>
  )
}

export default Button
