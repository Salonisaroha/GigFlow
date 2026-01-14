import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as gigAPI from "./gigAPI";

export const getGigs = createAsyncThunk(
  "gigs/getAll",
  async (search) => (await gigAPI.fetchGigs(search)).data
);

export const getGig = createAsyncThunk(
  "gigs/getOne",
  async (id) => (await gigAPI.fetchGigById(id)).data
);

export const postGig = createAsyncThunk(
  "gigs/create",
  async (data) => (await gigAPI.createGig(data)).data
);

export const getMyGigs = createAsyncThunk(
  "gigs/getMyGigs",
  async () => (await gigAPI.fetchMyGigs()).data
);

const gigSlice = createSlice({
  name: "gigs",
  initialState: {
    gigs: [],
    gig: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(getGig.fulfilled, (state, action) => {
        state.gig = action.payload;
      })
      .addCase(postGig.fulfilled, (state, action) => {
        state.gigs.unshift(action.payload);
      })
      .addCase(getMyGigs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(getMyGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gigSlice.reducer;
