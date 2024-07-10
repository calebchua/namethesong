# Name the Song

Two player song guessing game!

One player has the device and controls the audio, while the other player attempts to guess the song. The player with the device will mark each guess as correct or incorrect.

There are no rules beyond this (these aren't even really rules, just instructions on how to play), the game is meant to be played however the players like. Features in the game exist to allow for flexibility in the way the game is played.

### Notes on game features:
- Select as many settings in the Create Game page as you like, songs will be a random combination of all settings selected (only setting that is limited to one selection is Duration)
- Hear Again button will play from beginning of audio clip to where song currently is, no matter the Duration setting

<br/>

## Set Up

### 1. Clone repository from Github
```
https://github.com/calebchua/namethesong.git
```

### 2. Install dependencies
```
npm i
```

### 3. Create a Spotify Developer account
- Login to https://developer.spotify.com/
- Go to "Dashboard" and click "Create App"
- Fill out required fields
- Add "{URL}/creategame" as a redirect URI, where {URL} is your localhost URL (ex. ```"http://localhost:3000/creategame"```)
- Check the "Web API" box
- Save

### 4. Set .env variables
Create a ".env.local" file inside "namethesong" directory and add the following variables:
- "CLIENT_ID": Client ID from your Spotify Developer account
- "CLIENT_SECRET": Client Secret from your Spotify Developer account
- "URL": your localhost URL

Example:
```
CLIENT_ID={YOUR_CLIENT_ID}
CLIENT_SECRET={YOUR_CLIENT_SECRET}
URL=http://localhost:3000
```
<br/>

## Running The Project
```
npm run dev
```

Have fun! :)

#### Note: if you want other users to be able to login with their Spotify accounts, you must add them to your "User Management" list
- Navigate to your Spotify App created in Step 3 of Set Up
- Click Settings
- Go to the User Management page
- Add the user's name and email (email associated to their Spotify account)

This is required due to Spotify's Developer Mode, read more at https://developer.spotify.com/documentation/web-api/concepts/quota-modes
