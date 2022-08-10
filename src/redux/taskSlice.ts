import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
}

interface TaskProps {
  checked?: boolean
  name?: string
  id: string
}

interface initialProps {
  tasks: TaskProps[] | []
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    createTask: (state: initialProps, action: PayloadAction<TaskProps>) => {
      state.tasks = [...state.tasks, action.payload]
    },
    readTask: (state: initialProps, action: PayloadAction<TaskProps[]>) => {
      state.tasks = action.payload
    },
    deleteTask: (state: initialProps, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((value) => value.id !== action.payload)
    },
  },
})

export const { createTask, readTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer
