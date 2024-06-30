"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { getAllTracks } from "../api/spotifyAPI";
import { shuffle } from "../utils";
import Link from "next/link";
import SettingLabel from "../components/SettingLabel";
import { initializeYoutubeApi, searchVideo } from "../api/youtubeAPI";
import YoutubePlayer from "../components/YoutubePlayer";

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

// Spotify playlist item interface
interface Item {
  track: {
    artists: [{ name: string }]
    name: string
  }
}

const GamePage = () => {
  // playlist data from Spotify
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
  const [songsSkipped, setSongsSkipped] = useState<number>(0); // number of songs skipped
  const [currentSongName, setCurrentSongName] = useState<string | null>(null); // current song playing
  const [currentSongArtist, setCurrentSongArtist] = useState<string | null>(null); // current song playing
  const [currentPlayFrom, setCurrentPlayFrom] = useState<string | null>(null); // current setting for playFrom
  const [currentModifiersSong, setCurrentModifiersSong] = useState<string | null>(null); // current modifier for song
  const [currentModifiersTempo, setCurrentModifiersTempo] = useState<string | null>(null); // current modifiers for tempo
  const [songConfigured, setSongConfigured] = useState<boolean>(false); // keeps track if all song states have been configured
  const [songId, setSongId] = useState<string | null>(null); // id of song
  const [songDuration, setSongDuration] = useState<number | null>(null); // duration of song

  // configures current round of game, sets random song and random combination of selected settings to corresponding states
  const configureSong = () => {
    setCurrentModifiersSong(null);
    // set song name + artist as string
    let curr;
    if (songNumber < data.length) {
      curr = data[songNumber];
    }
    else {
      curr = data[Math.floor(Math.random() * data.length)]
    }
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
    setSongConfigured(true);
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
      const initialize = async () => {
        await initializeYoutubeApi();
      }

      getData();
      initialize();
    }
    return () => {
      effectRan.current = true;
    }
  }, []);

  // wait until playlist data has been loaded before attempting to configure song
  useEffect(() => {
    if (data.length > 0) {
      configureSong();
    }
  }, [data]);

  // creates Youtube song search query once song has been configured and states have been set, searches for song's video id
  useEffect(() => {
    const createQueryAndSearch = async () => {
      let query = currentSongName + " " + currentSongArtist + " " + currentModifiersSong;
      if (currentModifiersSong == "originalSong") {
        query+= " " + currentModifiersTempo;
      }
      query = query.replace("originalSong", "").replace("originalTempo", "").replace("slowedDown", "slowed").replace("spedUp", "sped up").replace("piano", "piano cover").replace("guitar", "guitar cover");
      let result;
      if (currentModifiersSong == "originalSong" && currentModifiersTempo == "originalTempo") {
        result = await searchVideo(query, "song");
      }
      else {
        result = await searchVideo(query, "video");
      }
      setSongId(result.id);
      setSongDuration(result.duration);
    }
    if (songConfigured) {
      createQueryAndSearch();
      setSongConfigured(false);
    }
  }, [songConfigured]);

  // loads next song once songNumber has been incremented
  useEffect(() => {
    if (songNumber != 0) {
      setSongId(null);
      configureSong();
    }
  }, [songNumber]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="inline-flex justify-between w-11/12 items-center mb-4 mt-4">
        <div className="text-5xl font-bold">Score: &nbsp;{songsCorrect} / {songNumber - songsSkipped}</div>
        <Link
          href={{
            pathname: "/finishgame"
          }}
          className={"border-2 border-white rounded-lg py-2 px-8 text-2xl mx-2 text-white bg-primary hover:underline"}
        >End Game</Link>
      </div>
      {songId ? (
        <div className="flex flex-col items-center justify-center h-4/6 w-4/5">
          <div className="text-4xl font-bold">{currentSongName}</div>
          <div className="text-2xl">{currentSongArtist}</div>
          <div className="flex flox-row">
            {currentPlayFrom && <SettingLabel>{currentPlayFrom}</SettingLabel>}
            {currentModifiersSong && <SettingLabel>{currentModifiersSong}</SettingLabel>}
            {currentModifiersTempo && <SettingLabel>{currentModifiersTempo}</SettingLabel>}
          </div>
          <div className="mt-2 text-3xl font-bold">
            <YoutubePlayer 
              songId={songId}
              songDuration={songDuration}
              duration={settings.duration}
              playFrom={currentPlayFrom}
              modifiersSong={currentModifiersSong}
              modifiersTempo={currentModifiersTempo}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-4/6 w-4/5 mt-2 text-3xl font-bold animate-pulse">Loading Song...</div>
      )}
      <div className="flex flex-col items-center my-4">
        <div className="flex items-center justify-center mb-2 space-x-28">
          <div
            className="flex items-center justify-center font-bold border-4 border-white rounded-lg bg-white text-primary text-8xl w-36 h-28 hover:cursor-pointer"
            onClick={() => {
              setSongNumber(songNumber + 1);
              setSongsCorrect(songsCorrect + 1);
            }}
          >
            <HiCheck />
          </div>
          <div
            className="flex items-center justify-center font-bold border-4 border-white rounded-lg bg-white text-primary text-8xl w-36 h-28 hover:cursor-pointer"
            onClick={() => {
              setSongNumber(songNumber + 1);
            }}
          >
            <HiX />
          </div>
        </div>
        <div
          className="flex items-center justify-center border-2 border-white rounded-lg w-24 h-10 hover:cursor-pointer hover:underline"
          onClick={() => {
            setSongNumber(songNumber + 1);
            setSongsSkipped(songsSkipped + 1);
          }}
        >
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
