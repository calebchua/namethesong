"use server"

// gets access token without user authorization, cannot access user specific info (ex. profile, playlists)
// see more info here: https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
export const getClientCredentialToken = async () => {
  await fetch("https://accounts.spotify.com/api/token", {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + btoa(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET)
    },
    body: "grant_type=client_credentials"
  })
    .then(response => response.json())
    .then(data => {
      console.log("data: ", data);
      return data.access_token;
    });
}

// gets access token with user authorization, user must have logged in through link generate from userAuthorization()
// see more info here: https://developer.spotify.com/documentation/web-api/tutorials/code-flow
export const getAuthorizationCodeToken = async () => {
  
}

// generates link to redirect users to Spotify login page
export const userAuthorization = async () => {
  const redirectURI = "http://localhost:3000/creategame"; // modify if hosting
  const scope = "playlist-read-private%20playlist-read-collaborative";
  const state = generateRandomString(16);
  const authArgs = "client_id=" + process.env.CLIENT_ID + "&response_type=code" + "&redirect_uri=" + redirectURI + "&scope=" + scope + "&state=" + state;
  // console.log("https://accounts.spotify.com/authorize?" + authArgs);
  return "https://accounts.spotify.com/authorize?" + authArgs;
}

// generates random string for state parameter in userAuthorization (security)
const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
