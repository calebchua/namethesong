"use server"

// variables used to get api from node package
const YoutubeMusicApi = require('youtube-music-api');
const api = new YoutubeMusicApi();

// initialize YouTube API
export const initializeYoutubeApi = async () => {
  try {
    await api.initalize();
  }
  catch (error) {
    console.error("Failed to initialize YouTube API", error);
    throw error;
  }
};

// call search on the YouTube API to get video given query
export const searchVideo = async (query: string, type: string) => {
  try {
    const result = await api.search(query, type);
    const id = result.content[0].videoId;
    const duration = result.content[0].duration;
    return { id, duration };
  }
  catch (error) {
    console.error("Failed to search for video", error);
    throw error;
  }
};