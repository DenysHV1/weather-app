import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";


const weatherSlice = createSlice({
	name: "weather",
	initialState,
	reducers: {

	},
	// extraReducers: (builder) => {

	// }
});

export const weatherReducer = weatherSlice.reducer;
// export const {  } = weatherSlice.actions;