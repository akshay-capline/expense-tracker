import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  name? : string,
  email? : string, 
  user_id : string
}

// Define the initial state using that type
const initialState: AuthState = {
  name : "",
  email : "", 
  user_id : ""
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUserdetails:  ( state, action: PayloadAction<AuthState>) => {
        const { name, email, user_id} = action.payload;
        state.name = name;
        state.email = email;
        state.user_id = user_id;
    }
  },
})


export const { setUserdetails } = authSlice.actions

export default authSlice.reducer