// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// export interface AuthUser {
//   id?: string;
//   name?: string;
//   email?: string;
//   phone?: string;
//   [key: string]: unknown;
// }

// export interface AuthState {
//   user: AuthUser | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   hydrated: boolean; // true once localStorage has been checked
// }

// const initialState: AuthState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   hydrated: false,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     hydrateAuth: (
//       state,
//       action: PayloadAction<{ token: string | null; user: AuthUser | null }>,
//     ) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.isAuthenticated = !!action.payload.token;
//       state.hydrated = true;
//     },
//     setCredentials: (
//       state,
//       action: PayloadAction<{ token: string | null; user: AuthUser | null }>,
//     ) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.isAuthenticated = !!action.payload.token;
//       state.hydrated = true;
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { hydrateAuth, setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  hydrated: boolean; // true once localStorage has been checked
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth: (
      state,
      action: PayloadAction<{ token: string | null; user: AuthUser | null }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.token;
      state.hydrated = true;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ token: string | null; user: AuthUser | null }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.token;
      state.hydrated = true;
    },
    // Merge changed fields into the saved user (e.g. after editing the profile)
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (!state.user) return;
      state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { hydrateAuth, setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
