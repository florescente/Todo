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
    createTask: (state: initialProps) => {},
    readTask: (state: initialProps, action: PayloadAction<TaskProps[]>) => {
      state.tasks = action.payload
    },
    updateTask: (state: initialProps) => {},
    deleteTask: (state: initialProps) => {},
  },
})

export const { readTask } = taskSlice.actions

export default taskSlice.reducer
