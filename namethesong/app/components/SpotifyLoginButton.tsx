"use client";
import React from "react";
import { userAuthorization } from "../api/spotifyAPI";

import { FaSpotify } from "react-icons/fa";

interface Props {
  loggedIn: boolean | null;
}

const SpotifyLoginButton: React.FC<Props> = ({ loggedIn }) => {
  // redirects to Spotify login page
  const authUser = async () => {
    window.location.href = await userAuthorization();
  }

  return (
    <button 
      className="flex items-center bg-spotify border-secondary border-2 rounded-3xl sm:py-2 py-1 sm:px-6 px-2 sm:text-2xl text-xs mx-2 hover:shadow-md"
      onClick={authUser}
    >
      <FaSpotify className="sm:mr-2 mr-1 sm:text-3xl text-xl"/>
      {loggedIn ? "Logged in" : "Login with Spotify to use custom/followed playlists"}
    </button>
  )
}

export default SpotifyLoginButton
