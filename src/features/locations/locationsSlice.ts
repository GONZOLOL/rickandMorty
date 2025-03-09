import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql, request } from "graphql-request";
import { Location, Info, LocationsState } from "../../types/locationTypes";

const endpoint = "https://rickandmortyapi.com/graphql";

const query = gql`
  query Locations($page: Int) {
    locations(page: $page) {
      results {
        id
        name
        type
        dimension
        residents {
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

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async ({ page }: { page: number }) => {
    const response = await request<{
      locations: { results: Location[]; info: Info };
    }>(endpoint, query, { page });
    return response.locations as { results: Location[]; info: Info };
  }
);

const initialState: LocationsState = {
  locations: [],
  info: {
    count: 0,
    next: null,
    pages: 0,
    prev: null,
  },
  status: "idle",
  error: null,
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.locations = action.payload.results;
        state.info = action.payload.info;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? null;
      });
  },
});

export default locationsSlice.reducer;
