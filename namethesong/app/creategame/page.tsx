'use client';
import React, { useState } from 'react';
import Button from '../components/Button';
import Link from "next/link";

const CreateGamePage = () => {
  // states to keep track of selected custom settings
  const [duration, setDuration] = useState<number | null>(null); // look into styling radio buttons
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
      <div className="mb-10 space-y-10">
        <div className="text-7xl font-bold text-center">Create Game</div>
        <div className="flex items-center space-x-4">
          <div className="text-4xl font-bold">Choose Playlist:</div>
          <div className="text-4xl">Dropdown Placeholder</div>
        </div>
      </div>
      <div className="w-4/5 border-2 border-white"></div>
      <div className="w-4/5 mt-8 mb-12 space-y-6">
        <div className="space-y-2">
          <div className="text-3xl">Max Song Duration:</div>
          <div className="flex-auto space-y-2">
            <Button changeSelect={() => setDuration(1)} multiselect={false}>1 Second</Button>
            <Button changeSelect={() => setDuration(2)} multiselect={false}>2 Seconds</Button>
            <Button changeSelect={() => setDuration(3)} multiselect={false}>3 Seconds</Button>
            <Button changeSelect={() => setDuration(5)} multiselect={false}>5 Seconds</Button>
            <Button changeSelect={() => setDuration(10)} multiselect={false}>10 Seconds</Button>
            <Button changeSelect={() => setDuration(-1)} multiselect={false}>No Limit</Button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl">Play From:</div>
          <div className="flex-auto space-y-2">
            <Button>Beginning</Button>
            <Button>Middle</Button>
            <Button>Ending</Button>
            <Button>Random</Button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-3xl">Modifiers:</div>
          <div className="flex-auto space-y-2">
            <div>
              <Button>Original Song</Button>
              <Button>Instrumental</Button>
              <Button>Piano</Button>
              <Button>Guitar</Button>
            </div>
            <div>
              <Button>Original Tempo</Button>
              <Button>Sped Up</Button>
              <Button>Slowed Down</Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Link href="/game" className="border-2 border-white rounded-lg py-4 px-16 text-4xl font-bold mx-2 text-primary bg-white">Start Game</Link>
      </div>
    </div>
  )
}

export default CreateGamePage
