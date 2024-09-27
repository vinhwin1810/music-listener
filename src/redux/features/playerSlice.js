import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      if (action.payload?.data?.tracks?.hits) {
        // Map hits to extract the songs if nested within "track"
        state.currentSongs = action.payload.data.tracks.hits.map(
          (hit) => hit.track || hit
        );
      } else if (action.payload?.data?.tracks) {
        state.currentSongs = action.payload.data.tracks;
      } else {
        state.currentSongs = action.payload.data || [];
      }

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      const nextSong =
        state.currentSongs[action.payload]?.track ||
        state.currentSongs[action.payload];
      state.activeSong = nextSong;
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      const prevSong =
        state.currentSongs[action.payload]?.track ||
        state.currentSongs[action.payload];
      state.activeSong = prevSong;
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
