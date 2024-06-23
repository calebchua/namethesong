import React from 'react'
import Button from '../components/Button'

const CreateGamePage = () => {
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div className="mt-8 mb-10 space-y-10">
        <div className="text-7xl font-bold text-center">Create Game</div>
        <div className="flex items-center space-x-4">
          <div className="text-4xl font-bold">Choose Playlist:</div>
          <div className="text-4xl">Dropdown Placeholder</div>
        </div>
      </div>
      <div className="w-4/5 border-2 border-white"></div>
      <div className="w-4/5 mt-8 mb-8 space-y-6">
        <div className="space-y-2">
          <div className="text-3xl">Song Duration:</div>
          <div className="flex-auto space-y-2">
            <Button>1 Second</Button>
            <Button>2 Seconds</Button>
            <Button>3 Seconds</Button>
            <Button>5 Seconds</Button>
            <Button>10 Seconds</Button>
            <Button>No Limit</Button>
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
        <button className="border-2 border-white rounded-lg py-4 px-16 text-4xl font-bold mx-2 text-primary bg-white">Start Game</button>
      </div>
    </div>
  )
}

export default CreateGamePage
