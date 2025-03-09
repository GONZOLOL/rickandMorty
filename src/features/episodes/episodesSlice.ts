import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql, request } from "graphql-request";
import { Episode, Info, EpisodesState } from "../../types/episodeTypes";

const endpoint = "https://rickandmortyapi.com/graphql";

const query = gql`
  query Episodes($page: Int) {
    episodes(page: $page) {
      results {
        id
        name
        air_date
        characters {
          id
        }
      }
      info {
        count
        next
        pages
        prev
      }
    }
  }
`;

export const fetchEpisodes = createAsyncThunk(
  "episodes/fetchEpisodes",
  async ({ page }: { page: number }) => {
    const response = await request<{
      episodes: { results: Episode[]; info: Info };
    }>(endpoint, query, { page });
    return response.episodes as { results: Episode[]; info: Info };
  }
);

const initialState: EpisodesState = {
  episodes: [],
  info: {
    count: 0,
    next: null,
    pages: 0,
    prev: null,
  },
  status: "idle",
  error: null,
};

const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.episodes = action.payload.results;
        state.info = action.payload.info;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default episodesSlice.reducer;
