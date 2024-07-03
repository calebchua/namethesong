"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const FinishGamePage = () => {
  // getting score from query sent by previous page
  const score: string = useSearchParams().get("correct") + "/" + useSearchParams().get("total");
  const loggedIn: string | null = useSearchParams().get("loggedIn");
  const token: string | null = useSearchParams().get("token");

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-7xl font-bold mb-8">Results</div>
      <div className="text-9xl font-bold">{score}</div>
      <Link
        href={{
          pathname: "/creategame",
          query: {
            loggedIn: loggedIn,
            token: token,
          }
        }}
        className="mt-8 mb-8 border-2 border-secondary rounded-lg py-4 px-16 text-4xl font-bold mx-2 text-primary bg-secondary transition ease-in-out hover:font-extrabold hover:shadow-2xl active:bg-gray-200 active:border-gray-200"
      >New Game</Link>
    </div>
  )
}

export default FinishGamePage