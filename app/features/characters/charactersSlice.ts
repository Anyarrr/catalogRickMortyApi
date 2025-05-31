import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Characters {
  id: string;
  name: string;
  image: string;
};

interface CharactersState {
  characters: Characters[];
  loading: boolean;
  error: string | null;
};

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async () => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    if (!res.ok) {
      throw new Error("Failed to fetch characters");
    }
    const data = await res.json();
    return data.results;
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (item) => {
    item
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка';
      });
  },
});

export default charactersSlice.reducer;