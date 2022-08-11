import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  currentUser: false,
  email: '',
  id: 'bah',
  loading: true,
  loadingTasks: true,
}

interface initialProps {
  currentUser: boolean
  email: string | null | undefined
  id: string | undefined
  loading: boolean
  loadingTasks: boolean
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
    getId: (state: initialProps, action: PayloadAction<string | undefined>) => {
      state.id = action.payload
    },
    getLoad: (state: initialProps, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    getLoadTasks: (state: initialProps, action: PayloadAction<boolean>) => {
      state.loadingTasks = action.payload
    },
  },
})

export const { signin, getUser, getId, getLoad, getLoadTasks } =
  authSlice.actions

export default authSlice.reducer
