"use client"
import React, { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";

// Youtube player props interface
interface Props {
  songId: string | null;
  songDuration: number | null;
  duration: number;
  playFrom: string | null;
  modifiersSong: string | null;
  modifiersTempo: string | null;
}

const YoutubePlayer: React.FC<Props> = ({ songId, songDuration, duration, playFrom, modifiersSong, modifiersTempo }) => {
  const playerRef = useRef<YouTubePlayer | null>(null); // ref to hold the YouTube player
  const originalDuration = duration;
  let timeout: NodeJS.Timeout | null = null; // used to keep track of duration

  // configures player to the custom settings of the current round
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // set playerRef
    playerRef.current = event.target;

    // set playback speed if modifiersSong isn't originalSong
    if (modifiersSong != "originalSong" && modifiersTempo != "originalTempo") {
      let rate: number;
      if (modifiersTempo == "spedUp") {
        rate = 1.25;
      }
      else {
        rate = 0.75;
      }
      playerRef.current.setPlaybackRate(rate);
    }

    // play video when ready
    playerRef.current.playVideo();
  }

  // pause video after duration number of seconds
  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (duration != -1) {
      if (event.data === 1) { // check if video is playing
        timeout = setTimeout(() => {
          if (playerRef.current) {
            playerRef.current.pauseVideo();
          }
        }, duration * 1000);
      } else {
        // clear timeout if video stops or pauses before duration seconds
        clearTimeout(timeout as NodeJS.Timeout);
      }
    }
  };

  // clear timeout
  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  let playFromMultiplier: number;
  switch (playFrom) {
    case "middle": {
      playFromMultiplier = 0.5;
      break;
    }
    case "ending": {
      playFromMultiplier = 0.85;
      break;
    }
    case "random": {
      playFromMultiplier = (Math.floor(Math.random() * 85) + 1) / 100; // random percentage from 0 to 85% (ending)
      break;
    }
    default: {
      playFromMultiplier = 0;
      break;
    }
  }

  const startTime: number = songDuration ? Math.floor((playFromMultiplier * (songDuration / 1000))) : 0;

  // options props for video player
  const opts: YouTubeProps['opts'] = {
    height: '351',
    width: '576',
    playerVars: {
      autoplay: 1,
      rel: 0,
      start: startTime,
    },
  };

  // another duration seconds button (just a play button)
  const anotherPlay = () => {
    duration = originalDuration;
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  }

  // allow for play/pause functionality through external button
  const playPause = () => {
    if (playerRef.current) {
      if (playerRef.current.getPlayerState() == 1) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  }

  // goes back to where the song originally started and plays up until current point
  const hearAgain = () => {
    if (playerRef.current) {
      duration = playerRef.current.getCurrentTime() - startTime;
      playerRef.current.seekTo(startTime);
      playerRef.current.playVideo();
    }
  }

  // add popup confirmation for end game


  const buttonClass = "mt-2 text-2xl border-2 border-white rounded-md bg-white text-primary font-bold w-64 h-12 hover:underline active:bg-gray-200 active:border-gray-200";

  return (
    <div className="flex flex-col items-center">
      <YouTube videoId={songId} opts={opts} onReady={onPlayerReady} onStateChange={onPlayerStateChange}/>
      <div className="flex flex-row space-x-4">
        <button 
          className={buttonClass}
          onClick={hearAgain}
        >
          Hear Again
        </button>
        {duration != -1 ? ( 
          <button
            className={buttonClass}
            onClick={anotherPlay}
          >
            Another {duration} {duration == 1 ? "Second" : "Seconds"}
          </button>
        ) : (
          <button
            className={buttonClass}
            onClick={playPause}
          >
            Play/Pause
          </button>
        )}
      </div>
    </div>
  )
}

export default YoutubePlayer
