"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { getAllTracks } from "../api/spotifyAPI";
import { shuffle } from "../utils";

// settings interface
interface Settings {
  duration: number;
  playFrom: string[] | undefined;
  modifiersSong: string[] | undefined;
  modifiersTempo: string[] | undefined;
}

interface Item {
  track: {
    artists: [{ name: string }]
    name: string
  }
}

const GamePage = () => {
  const [data, setData] = useState<Array<Item>>([]);

  // variables parsed from url
  const spotifyToken: string | null = useSearchParams().get("token"); // Spotify auth token
  const playlistId: string | null = useSearchParams().get("playlistId"); // playlist id
  const settings: Settings = { // settings object
    duration: parseInt(useSearchParams().get("duration") as string),
    playFrom: useSearchParams().get("playFrom")?.split(","),
    modifiersSong: useSearchParams().get("modifiersSong")?.split(","),
    modifiersTempo: useSearchParams().get("modifiersTempo")?.split(","),
  };

  // states to maintain game
  const [songNumber, setSongNumber] = useState<number>(0); // current song number
  const [songsCorrect, setSongsCorrect] = useState<number>(0); // correct songs count
  const [currentSong, setCurrentSong] = useState<string | null>(null); // current song playing
  const [currentPlayFrom, setCurrentPlayFrom] = useState<string | null>(null); // current setting for playFrom
  const [currentModifiers, setCurrentModifiers] = useState<string[] | null>(null); // current modifiers for song

  // configures current round of game, sets random song and random combination of selected settings to corresponding states
  const configureSong = () => {
    console.log("before config: ", data);
    // set song name + artist as string
    const curr = data[songNumber];
    setCurrentSong(curr.track.name + " " + curr.track.artists[0].name);

    // get random playFrom setting
    let playFromindex = 0;
    if (settings.playFrom) {
      if (settings.playFrom.length > 1) {
        playFromindex = Math.floor(Math.random() * settings.playFrom.length);
      }
    }
    setCurrentPlayFrom(settings.playFrom ? settings.playFrom[playFromindex] : "beginning");

    // get random song modifier
    let modifiersSongIndex = 0;
    if (settings.modifiersSong) {
      if (settings.modifiersSong.length > 1) {
        modifiersSongIndex = Math.floor(Math.random() * settings.modifiersSong.length);
      }
    }
    const modifiersSongStr = settings.modifiersSong ? settings.modifiersSong[modifiersSongIndex] : "originalSong";

    // get random tempo modifier
    let modifiersTempoIndex = 0;
    if (settings.modifiersTempo) {
      if (settings.modifiersTempo.length > 1) {
        modifiersTempoIndex = Math.floor(Math.random() * settings.modifiersTempo.length);
      }
    }
    const modifiersTempoStr = settings.modifiersTempo ? settings.modifiersTempo[modifiersTempoIndex] : "originalTempo";

    setCurrentModifiers([modifiersSongStr, modifiersTempoStr]);
  }

  // prevent useEffect from triggering twice
  const effectRan = useRef(false);

  // load all tracks from playlist given id
  useEffect(() => {
    if (effectRan.current === false) {
      const getData = async () => {
        let fetchedTracks = await getAllTracks(spotifyToken, playlistId);
        fetchedTracks = await shuffle(fetchedTracks);
        setData(fetchedTracks);
      }
      getData();
      console.log("got and shuffled data");
    }
    return () => {
      effectRan.current = true;
    }
  }, []);

  return (
    <div>
      <div>game page</div>
      <button onClick={() => {
        configureSong();
        console.log("after config", data);
      }
      }
      >test</button>
      <div>{currentSong}</div>
      <div>{currentPlayFrom}</div>
      <div>{currentModifiers}</div>
    </div>
  )
}

export default GamePage
