"use client"
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getPublicPlaylists, getUserPlaylists } from "../api/spotifyAPI";

interface Props {
  token: string | null;
  loggedIn: boolean | null;
  handleChange: (newType: string | null) => void;
}

type OptionType = {
  value: string;
  label: string;
};

const Dropdown: React.FC<Props> = ({ token, loggedIn, handleChange }) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    const populateOptions = async () => {
      try {
        if (token) {
          const data = await getUserPlaylists(token);
          // const data = loggedIn ? await getUserPlaylists(token) : await getPublicPlaylists(token);
          // getPublicPlaylist API call is deprecated, now requires login
          if (data) {
            const list = data
              .filter((playlist: any) => playlist != null)
              .map((playlist: any) => ({
                value: playlist.id,
                label: playlist.name
              }));
            setOptions(list);
          }
        }
      } catch (error) {
        console.error("Error populating dropdown options:", error);
      }
    }
    populateOptions();
  }, [token, loggedIn]);

  return (
    <Select 
        className="sm:text-lg text-sm text-black sm:w-96 w-48"
        options={options}
        onChange={(event) => handleChange?.(event ? event.value : null)}
    />
  )
}

export default Dropdown
