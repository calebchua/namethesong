"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { getAllTracks } from "../api/spotifyAPI";
import { shuffle } from "../utils";
import Link from "next/link";
import SettingLabel from "../components/SettingLabel";

import { HiCheck } from "react-icons/hi";
import { HiX } from "react-icons/hi";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

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
  const [currentSongName, setCurrentSongName] = useState<string | null>(null); // current song playing
  const [currentSongArtist, setCurrentSongArtist] = useState<string | null>(null); // current song playing
  const [currentPlayFrom, setCurrentPlayFrom] = useState<string | null>(null); // current setting for playFrom
  const [currentModifiersSong, setCurrentModifiersSong] = useState<string | null>(null); // current modifier for song
  const [currentModifiersTempo, setCurrentModifiersTempo] = useState<string | null>(null); // current modifiers for tempo

  // configures current round of game, sets random song and random combination of selected settings to corresponding states
  const configureSong = () => {
    // set song name + artist as string
    const curr = data[songNumber];
    setCurrentSongName(curr.track.name);
    setCurrentSongArtist(curr.track.artists[0].name);

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
    setCurrentModifiersSong(settings.modifiersSong ? settings.modifiersSong[modifiersSongIndex] : "originalSong");

    // get random tempo modifier
    let modifiersTempoIndex = 0;
    if (settings.modifiersTempo) {
      if (settings.modifiersTempo.length > 1) {
        modifiersTempoIndex = Math.floor(Math.random() * settings.modifiersTempo.length);
      }
    }
    setCurrentModifiersTempo(settings.modifiersTempo ? settings.modifiersTempo[modifiersTempoIndex] : "originalTempo");
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
    }
    return () => {
      effectRan.current = true;
    }
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      configureSong();
    }
  }, [data])

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="inline-flex justify-between w-11/12 items-center mb-4 mt-4">
        <div className="text-5xl font-bold">Score: {songsCorrect} / {songNumber}</div>
        <Link
          href={{
            pathname: "/finishgame"
          }}
          className={"border-2 border-white rounded-lg py-2 px-8 text-2xl mx-2 text-white bg-primary hover:underline"}
        >End Game</Link>
      </div>
      <div className="flex flex-col items-center justify-center h-4/6 w-4/5">
        <div className="text-4xl font-bold">{currentSongName}</div>
        <div className="text-2xl">{currentSongArtist}</div>
        <div className="flex flox-row mt-4">
          {currentPlayFrom && <SettingLabel>{currentPlayFrom}</SettingLabel>}
          {currentModifiersSong && <SettingLabel>{currentModifiersSong}</SettingLabel>}
          {currentModifiersTempo && <SettingLabel>{currentModifiersTempo}</SettingLabel>}
        </div>
      </div>
      <div className="flex flex-col items-center my-4">
        <div className="flex items-center justify-center mb-2 space-x-28">
          <div className="flex items-center justify-center font-bold border-4 border-white rounded-lg bg-white text-primary text-8xl w-36 h-28">
            <HiCheck />
          </div>
          <div className="flex items-center justify-center font-bold border-4 border-white rounded-lg bg-white text-primary text-8xl w-36 h-28">
            <HiX />
          </div>
        </div>
        <div className="flex items-center justify-center border-2 border-white rounded-lg w-24 h-10">
          <div className="text-2xl mr-1">
            skip
          </div>
          <TbPlayerTrackNextFilled className="text-xl" />
        </div>
      </div>
    </div>
  )
}

export default GamePage
