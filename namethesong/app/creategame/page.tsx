"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "../components/Button";
import { getSpotifyToken } from "../api/spotifyAPI";
import SpotifyLoginButton from "../components/SpotifyLoginButton";
import Dropdown from "../components/Dropdown";
import { useSearchParams } from "next/navigation";

const CreateGamePage = () => {
  return (
    <Suspense>
      <CreateGameContent />
    </Suspense>
  )
}

const CreateGameContent = () => {
  // states to keep track of selected custom settings
  const [duration, setDuration] = useState<number | null>(null);
  const [playFrom, setPlayFrom] = useState({
    beginning: false,
    middle: false,
    ending: false,
    random: false
  });
  const [modifiersSong, setModifiersSong] = useState({
    originalSong: false,
    instrumental: false,
    piano: false,
    guitar: false
  });
  const [modifiersTempo, setModifiersTempo] = useState({
    originalTempo: false,
    spedUp: false,
    slowedDown: false
  });

  // access token state so we can access Spotify API
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // get code returned from Spotify login in URL
  const code: string | null = useSearchParams().get('code');

  // Spotify token if already authenticated
  const token: string | null = useSearchParams().get("token");
  const prevLoggedIn: string | null = useSearchParams().get("loggedIn");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  // prevent useEffect from triggering twice
  const effectRan = useRef(false);

  // detect when a code is returned from Spotify in URL and get playlists
  useEffect(() => {
    if (effectRan.current === false) {
      if (prevLoggedIn == "true") {
        setAccessToken(token);
        setLoggedIn(true);
      }
      else {
        const setToken = async () => {
          let result = await getSpotifyToken(code);
          if (result) setAccessToken(result.token);
          if (result) setLoggedIn(result.user);
        }
        setToken();
      }
    }

    return () => {
      effectRan.current = true;
    }
  }, []);

  // state to hold selected playlist id from dropdown
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  // function to verify that selections have been made before starting game
  const verifySelection = (): boolean => {
    if (selectedPlaylist != null && duration != null && Object.values(playFrom).some(value => value === true)
      && Object.values(modifiersSong).some(value => value === true) && Object.values(modifiersTempo).some(value => value === true)) {
      return true;
    }
    return false;
  }

  // parses state objects, returns a string with names of settings == true, string can be later split
  const parseState = (state: any): string => {
    let stateString: string = "";
    for (let prop in state) {
      if (state.hasOwnProperty(prop)) {
        if (state[prop] === true)
          stateString += prop + ",";
      }
    }
    return stateString.slice(0, -1);
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="sm:mb-6 mb-4 sm:space-y-4 space-y-2">
        <div className="sm:text-7xl text-4xl font-bold text-center sm:mb-6 mb-4">Create Game</div>
        <div className="flex justify-center">
          <SpotifyLoginButton loggedIn={loggedIn} />
        </div>
        <div className="flex items-center justify-center sm:space-x-4 space-x-2">
          <div className="sm:text-3xl text-lg font-bold">Choose Playlist:</div>
          <Dropdown token={accessToken} loggedIn={loggedIn} handleChange={setSelectedPlaylist} />
        </div>
      </div>
      <div className="w-4/5 border-2 border-secondary"></div>
      <div className="w-4/5 sm:mt-4 mt-2 sm:mb-12 mb-6 sm:space-y-4 space-y-2">
        <div className="sm:space-y-2 space-y-1">
          <div className="sm:text-3xl text-xl">Max Song Duration:</div>
          <div className="flex-auto sm:space-y-2 space-y-1">
            <Button changeSelect={() => setDuration(1)} selected={duration == 1}>1 Second</Button>
            <Button changeSelect={() => setDuration(2)} selected={duration == 2}>2 Seconds</Button>
            <Button changeSelect={() => setDuration(3)} selected={duration == 3}>3 Seconds</Button>
            <Button changeSelect={() => setDuration(5)} selected={duration == 5}>5 Seconds</Button>
            <Button changeSelect={() => setDuration(10)} selected={duration == 10}>10 Seconds</Button>
            <Button changeSelect={() => setDuration(-1)} selected={duration == -1}>No Limit</Button>
          </div>
        </div>
        <div className="sm:space-y-2 space-y-1">
          <div className="sm:text-3xl text-xl">Play From:</div>
          <div className="flex-auto sm:space-y-2 space-y-1">
            <Button changeSelect={() => setPlayFrom({ ...playFrom, beginning: !playFrom.beginning })} selected={playFrom.beginning}>Beginning</Button>
            <Button changeSelect={() => setPlayFrom({ ...playFrom, middle: !playFrom.middle })} selected={playFrom.middle}>Middle</Button>
            <Button changeSelect={() => setPlayFrom({ ...playFrom, ending: !playFrom.ending })} selected={playFrom.ending}>Ending</Button>
            <Button changeSelect={() => setPlayFrom({ ...playFrom, random: !playFrom.random })} selected={playFrom.random}>Random</Button>
          </div>
        </div>
        <div className="sm:space-y-2 space-y-1">
          <div className="sm:text-3xl text-xl">Modifiers:</div>
          <div className="flex-auto sm:space-y-2 space-y-1">
            <div className="space-y-1">
              <Button
                changeSelect={() => setModifiersSong({ ...modifiersSong, originalSong: !modifiersSong.originalSong })}
                selected={modifiersSong.originalSong}
              >Original Song</Button>
              <Button
                changeSelect={() => setModifiersSong({ ...modifiersSong, instrumental: !modifiersSong.instrumental })}
                selected={modifiersSong.instrumental}
              >Instrumental</Button>
              <Button
                changeSelect={() => setModifiersSong({ ...modifiersSong, piano: !modifiersSong.piano })}
                selected={modifiersSong.piano}
              >Piano</Button>
              <Button
                changeSelect={() => setModifiersSong({ ...modifiersSong, guitar: !modifiersSong.guitar })}
                selected={modifiersSong.guitar}
              >Guitar</Button>
            </div>
            <div className="space-y-1">
              <Button
                changeSelect={() => setModifiersTempo({ ...modifiersTempo, originalTempo: !modifiersTempo.originalTempo })}
                selected={modifiersTempo.originalTempo}
              >Original Tempo</Button>
              <Button
                changeSelect={() => setModifiersTempo({ ...modifiersTempo, spedUp: !modifiersTempo.spedUp })}
                selected={modifiersTempo.spedUp}
              >Sped Up</Button>
              <Button
                changeSelect={() => setModifiersTempo({ ...modifiersTempo, slowedDown: !modifiersTempo.slowedDown })}
                selected={modifiersTempo.slowedDown}
              >Slowed Down</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:mb-4 mb-0">
        {verifySelection() ? (
          <Link
          href={{
            pathname: "/game",
            query: {
              loggedIn: loggedIn,
              token: accessToken,
              playlistId: selectedPlaylist,
              duration: duration,
              playFrom: parseState(playFrom),
              modifiersSong: parseState(modifiersSong),
              modifiersTempo: parseState(modifiersTempo)
            }
          }}
          className="border-2 border-secondary rounded-lg sm:py-4 py-2 sm:px-16 px-8 sm:text-4xl text-xl font-bold mx-2 text-primary bg-secondary transition ease-in-out hover:font-extrabold hover:shadow-2xl active:bg-gray-200 active:border-gray-200"
          >Start Game</Link>
        ) : (
          <div className="sm:text-4xl text-md sm:mt-0 mt-1 mx-2 text-secondary text-center">
            Select a playlist and at least one setting per row
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateGamePage
