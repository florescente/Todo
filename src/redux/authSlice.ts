import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentUser: false,
  email: '',
  id: '',
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
    getId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
  },
})

export const { signin, getUser, getId } = authSlice.actions

export default authSlice.reducer
