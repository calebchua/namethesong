"use client"
import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { searchVideo } from "../api/youtubeAPI";

// Youtube player props interface
interface Props {
  query: string;
  duration: number;
  playFrom: string | null;
}

const opts: YouTubeProps['opts'] = {
  height: '351',
  width: '576',
  playerVars: {
    autoplay: 1,
  },
};

const YoutubePlayer: React.FC<Props> = ({ query, duration, playFrom }) => {
  return (
    <div className="flex flex-col items-center">
      <YouTube videoId="2g811Eo7K8U" opts={opts}/>
      <button className="mt-2 text-2xl border-2 border-white rounded-md bg-white text-primary font-bold w-60 h-12 hover:underline">Hear Again</button>
    </div>
  )
}

export default YoutubePlayer
