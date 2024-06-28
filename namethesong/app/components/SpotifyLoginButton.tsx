"use client";
import React from "react";
import Image from "next/image";
import { userAuthorization } from "../api/spotifyAPI";

const SpotifyLoginButton = () => {
  // redirects to Spotify login page
  const authUser = async () => {
    window.location.href = await userAuthorization();
  }

  return (
    <button 
      className="flex items-center bg-spotify border-white border-2 rounded-3xl py-2 px-6 text-2xl mx-2 hover:shadow-md"
      onClick={authUser}
    >
      <Image 
        src="/Spotify_Primary_Logo_RGB_White.png"
        height={30}
        width={30}
        alt="spotifylogo"
        className="mr-2"
      />
      Login with Spotify to use custom playlists
    </button>
  )
}

export default SpotifyLoginButton
