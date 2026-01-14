import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as bidAPI from "./bidAPI";

export const createBid = createAsyncThunk(
  "bids/create",
  async (data) => (await bidAPI.submitBid(data)).data
);

export const getBids = createAsyncThunk(
  "bids/getByGig",
  async (gigId) => (await bidAPI.fetchBidsByGig(gigId)).data
);

export const hireFreelancer = createAsyncThunk(
  "bids/hire",
  async (bidId) => (await bidAPI.hireBid(bidId)).data
);

export const getMyBids = createAsyncThunk(
  "bids/getMyBids",
  async () => (await bidAPI.fetchMyBids()).data
);

const bidSlice = createSlice({
  name: "bids",
  initialState: {
    bids: [],
    myBids: [],
    loading: false,
  },
  reducers: {
    clearBids: (state) => {
      state.bids = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBids.fulfilled, (state, action) => {
        state.loading = false;
        state.bids = action.payload;
      })
      .addCase(getMyBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyBids.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids = action.payload;
      });
  },
});

export const { clearBids } = bidSlice.actions;
export default bidSlice.reducer;
