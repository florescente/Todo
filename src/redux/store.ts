import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import authReducer from './authSlice'
import taskReducer from './taskSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    counter: counterReducer,
  },
})
