"use client";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../components/Button";
import { userAuthorization } from "../api/spotifyAPI";
import SpotifyLoginButton from "../components/SpotifyLoginButton";

const CreateGamePage = () => {
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
    slowedDown: false,
  });

  // rendered page
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="mb-6 space-y-4">
        <div className="text-7xl font-bold text-center mb-12">Create Game</div>
        <div className="flex justify-center">
          <SpotifyLoginButton />
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold">Choose Playlist:</div>
          <div className="text-3xl">Dropdown Placeholder</div>
        </div>
      </div>
      <div className="w-4/5 border-2 border-white"></div>
      <div className="w-4/5 mt-4 mb-12 space-y-4">
        <div className="space-y-2">
          <div className="text-3xl">Max Song Duration:</div>
          <div className="flex-auto space-y-2">
            <Button changeSelect={() => setDuration(1)} selected={duration==1}>1 Second</Button>
            <Button changeSelect={() => setDuration(2)} selected={duration==2}>2 Seconds</Button>
            <Button changeSelect={() => setDuration(3)} selected={duration==3}>3 Seconds</Button>
            <Button changeSelect={() => setDuration(5)} selected={duration==5}>5 Seconds</Button>
            <Button changeSelect={() => setDuration(10)} selected={duration==10}>10 Seconds</Button>
            <Button changeSelect={() => setDuration(-1)} selected={duration==-1}>No Limit</Button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl">Play From:</div>
          <div className="flex-auto space-y-2">
            <Button changeSelect={() => setPlayFrom({...playFrom, beginning: !playFrom.beginning})} selected={playFrom.beginning}>Beginning</Button>
            <Button changeSelect={() => setPlayFrom({...playFrom, middle: !playFrom.middle})} selected={playFrom.middle}>Middle</Button>
            <Button changeSelect={() => setPlayFrom({...playFrom, ending: !playFrom.ending})} selected={playFrom.ending}>Ending</Button>
            <Button changeSelect={() => setPlayFrom({...playFrom, random: !playFrom.random})} selected={playFrom.random}>Random</Button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl">Modifiers:</div>
          <div className="flex-auto space-y-2">
            <div>
              <Button 
                changeSelect={() => setModifiersSong({...modifiersSong, originalSong: !modifiersSong.originalSong})} 
                selected={modifiersSong.originalSong}
              >Original Song</Button>
              <Button
                changeSelect={() => setModifiersSong({...modifiersSong, instrumental: !modifiersSong.instrumental})} 
                selected={modifiersSong.instrumental}
              >Instrumental</Button>
              <Button
                changeSelect={() => setModifiersSong({...modifiersSong, piano: !modifiersSong.piano})} 
                selected={modifiersSong.piano}
              >Piano</Button>
              <Button
                changeSelect={() => setModifiersSong({...modifiersSong, guitar: !modifiersSong.guitar})} 
                selected={modifiersSong.guitar}
              >Guitar</Button>
            </div>
            <div>
              <Button 
                changeSelect={() => setModifiersTempo({...modifiersTempo, originalTempo: !modifiersTempo.originalTempo})}
                selected={modifiersTempo.originalTempo}
              >Original Tempo</Button>
              <Button
                changeSelect={() => setModifiersTempo({...modifiersTempo, spedUp: !modifiersTempo.spedUp})}
                selected={modifiersTempo.spedUp}
              >Sped Up</Button>
              <Button
                changeSelect={() => setModifiersTempo({...modifiersTempo, slowedDown: !modifiersTempo.slowedDown})}
                selected={modifiersTempo.slowedDown}
              >Slowed Down</Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link 
          href="/game"
          className="border-2 border-white rounded-lg py-4 px-16 text-4xl font-bold mx-2 text-primary bg-white transition ease-in-out hover:font-extrabold hover:shadow-2xl"
          onClick={() => {
            console.log("Duration: ", duration, "\n\n", "PlayFrom: ", JSON.stringify(playFrom), "\n\n", "ModifiersSong: ", JSON.stringify(modifiersSong), "\n\n", "ModifiersTempo: ", JSON.stringify(modifiersTempo));
          }}
        >Start Game</Link>
      </div>
    </div>
  )
}

export default CreateGamePage
