import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  email: string;
  id: string;
}

const initialState: IUser = {
  email: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.email = "";
      state.id = "";
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
