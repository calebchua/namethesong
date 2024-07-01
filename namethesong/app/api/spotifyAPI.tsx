"use server"

// AUTH API FUNCTIONS

// token return object interface
interface ReturnObject {
  token: string | null;
  user: boolean;
}

// function used externally to get token, handles whether or not auth is clientCredential or normal Authorization
export const getSpotifyToken = async (code: string | null): Promise<ReturnObject | null> => {
  let token: string | null;
  let user: boolean;
  if (code) {
    token = await getAuthorizationCodeToken(code);
    user = true;
  }
  else {
    token = await getClientCredentialToken();
    user = false;
  }
  return { token, user };
}

// gets access token without user authorization, cannot access user specific info (ex. profile, playlists)
// see more info here: https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
export const getClientCredentialToken = async (): Promise<string | null> => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET)
      },
      body: new URLSearchParams({
        grant_type: "client_credentials"
      })
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
}

// gets access token with user authorization, user must have logged in through link generate from userAuthorization()
// see more info here: https://developer.spotify.com/documentation/web-api/tutorials/code-flow
export const getAuthorizationCodeToken = async (urlCode: string): Promise<string | null> => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET)
      },
      body: new URLSearchParams({
        code: urlCode,
        redirect_uri: process.env.URL + "/creategame",
        grant_type: "authorization_code"
      })
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
}

// generates link to redirect users to Spotify login page
export const userAuthorization = async () => {
  const redirectURI = process.env.URL + "/creategame";
  const scope = "playlist-read-private%20playlist-read-collaborative";
  const state = generateRandomString(16);
  const authArgs = "client_id=" + process.env.CLIENT_ID + "&response_type=code" + "&redirect_uri=" + redirectURI + "&scope=" + scope + "&state=" + state;
  return "https://accounts.spotify.com/authorize?" + authArgs;
}

// generates random string for state parameter in userAuthorization (security)
const generateRandomString = (length: number) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}


// SPOTIFY DATA API FUNCTIONS

// gets kpop playlists (can also replace kpop with any genre that exists in spotify)
export const getPublicPlaylists = async (token: string | null) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/browse/categories/kpop/playlists", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    const data = await response.json();
    return data.playlists.items;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

// gets user's list of playlists
export const getUserPlaylists = async (token: string | null) => {
  try {
    const response = await fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error("Error fetching user's playlists:", error);
    return null;
  }
}

// gets list of tracks from playlist (returns song name and artist only, as specified by "?fields=")
const getListOfTracksFromPlaylist = async (token: string | null, playlistId: string | null) => {
  const fetchUrl = "https://api.spotify.com/v1/playlists/" + playlistId + "?fields=tracks%28next%2Citems%28track%28name%2Cartists%28name%29%29%29%29";
  try {
    const response = await fetch(fetchUrl, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching list of tracks from playlist:", error);
    return null;
  }
}

// get all tracks (if playlist is longer than 100 songs, will need to loop GET request)
export const getAllTracks = async(token: string | null, playlistId: string | null) => {
  const response = await getListOfTracksFromPlaylist(token, playlistId);
  let list = response.tracks.items;
  let next = response.tracks.next;
  let offset = 100;
  
  while (next) {
    next = "https://api.spotify.com/v1/playlists/" + playlistId + "/tracks?fields=next%2Citems%28track%28name%2Cartists%28name%29%29%29&offset=" + offset;
    try {
      const response = await fetch(next, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      const data = await response.json();
      list = [...list, ...data.items]
      next = data.next;
      offset += 100;
    } catch (error) {
      console.error("Error fetching next set of tracks from playlist:", error);
      return list;
    }
  }
  return list;
}
