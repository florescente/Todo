import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentUser: false,
  email: '',
}

interface initialProps {
  currentUser: boolean
  email: string | null | undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<boolean>) => {
      state.currentUser = action.payload
    },
    getUser: (
      state: initialProps,
      action: PayloadAction<string | null | undefined>
    ) => {
      state.email = action.payload
    },
  },
})

export const { signin, getUser } = authSlice.actions

export default authSlice.reducer
