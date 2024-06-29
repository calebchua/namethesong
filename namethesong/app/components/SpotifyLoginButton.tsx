"use client";
import React from "react";
import Image from "next/image";
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
      className="flex items-center bg-spotify border-white border-2 rounded-3xl py-2 px-6 text-2xl mx-2 hover:shadow-md"
      onClick={authUser}
    >
      <FaSpotify className="mr-2 text-3xl"/>
      {loggedIn ? "Logged in" : "Login with Spotify to use custom/followed playlists"}
    </button>
  )
}

export default SpotifyLoginButton
