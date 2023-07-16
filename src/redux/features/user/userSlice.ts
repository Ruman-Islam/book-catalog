import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  name: string;
  email: string;
  id: string;
}

const initialState: IUser = {
  name: "",
  email: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.id = "";
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
