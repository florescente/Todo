import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sign: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state) => {
      state.sign = true
    },
    signout: (state) => {
      state.sign = false
    },
  },
})

export const { signin, signout } = authSlice.actions

export default authSlice.reducer
