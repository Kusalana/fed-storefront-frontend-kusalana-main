import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
      id: null, 
      name: "", 
    },
    reducers: {
      setUser(state, action) {
        state.id = action.payload.id;
      },
    },
  });
  
  
  export const { setUser } = userSlice.actions;
  export default userSlice.reducer;
  