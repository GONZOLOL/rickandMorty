import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql, request } from "graphql-request";
import { Character, Info, CharactersState } from "../../types/characterTypes";

const endpoint = "https://rickandmortyapi.com/graphql";

const query = gql`
  query Characters(
    $page: Int
    $name: String
    $species: String
    $gender: String
    $status: String
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        species: $species
        gender: $gender
        status: $status
      }
    ) {
      results {
        id
        name
        image
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

export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters",
  async ({
    page,
    name,
    species,
    gender,
    status,
  }: {
    page: number;
    name?: string;
    species?: string;
    gender?: string;
    status?: string;
  }) => {
    const response = await request(endpoint, query, {
      page,
      name,
      species,
      gender,
      status,
    });
    return (response as { characters: { results: Character[]; info: Info } })
      .characters;
  }
);

const initialState: CharactersState = {
  characters: [],
  info: {
    count: 0,
    next: null,
    pages: 0,
    prev: null,
  },
  status: "idle",
  error: null,
  filters: {
    name: "",
    species: "",
    gender: "",
    status: "",
  },
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.characters = action.payload.results;
        state.info = action.payload.info;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export const { setFilters } = charactersSlice.actions;

export default charactersSlice.reducer;
