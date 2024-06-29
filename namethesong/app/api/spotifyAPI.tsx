"use server"

// AUTH API FUNCTIONS

// function used externally to get token, handles whether or not auth is clientCredential or normal Authorization
export const getSpotifyToken = async (code: string | null): Promise<string | null> => {
  if (code) {
    return getAuthorizationCodeToken(code); // may not be working
  }
  return getClientCredentialToken();
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
        redirect_uri: "http://localhost:3000/creategame", // modify this if hosting
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
  const redirectURI = "http://localhost:3000/creategame"; // modify here if hosting
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

// gets list of tracks from playlist
export const getListOfTracksFromPlaylist = async (token: string | null, playlistId: string | null) => {
  
}
