# namethesong

{DESCRIBE PROJECT HERE}

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
- Add "{URL}/creategame" as a redirect URI, where {URL} is your localhost URL (ex. ```"http://localhost:3000/creategame")```)
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

## Running the project
```
npm run dev
```

Have fun! :)
