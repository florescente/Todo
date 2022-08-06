import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentUser: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<boolean>) => {
      state.currentUser = action.payload
    },
  },
})

export const { signin } = authSlice.actions

export default authSlice.reducer
