"use client";
import React, { useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import { getAllTracks } from "../api/spotifyAPI";

const GamePage = () => {
  const token: string | null = useSearchParams().get("token");
  const playlistId: string | null = useSearchParams().get("playlistId");

  useEffect(() => {
    const getData = async () => {
      const data = await getAllTracks(token, playlistId);
      console.log(data);
    }
    getData();
  }, []);

  return (
    <div>
      <div>game page</div>
    </div>
  )
}

export default GamePage
