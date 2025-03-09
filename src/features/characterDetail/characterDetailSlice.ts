import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql, request } from "graphql-request";
import {
  CharacterDetail,
  CharacterDetailState,
} from "../../types/characterDetailTypes";

const endpoint = "https://rickandmortyapi.com/graphql";

const query = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      image
      gender
      origin {
        name
      }
      episode {
        id
        name
        air_date
      }
    }
  }
`;

export const fetchCharacterDetail = createAsyncThunk(
  "characterDetail/fetchCharacterDetail",
  async (id: string) => {
    const response = await request<{ character: CharacterDetail }>(
      endpoint,
      query,
      { id }
    );
    return response.character as CharacterDetail;
  }
);

const initialState = {
  character: null,
  status: "idle",
  error: null,
  currentEpisodeIndex: 0,
} as CharacterDetailState;

const characterDetailSlice = createSlice({
  name: "characterDetail",
  initialState,
  reducers: {
    setCurrentEpisodeIndex: (state, action) => {
      state.currentEpisodeIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacterDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.character = action.payload;
      })
      .addCase(fetchCharacterDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { setCurrentEpisodeIndex } = characterDetailSlice.actions;

export default characterDetailSlice.reducer;
