import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  tasks: [
    { name: 'name', checked: true },
    { name: 'nome', checked: false },
  ],
}

interface TaskProps {
  checked: boolean
  name: string
}

interface initialProps {
  tasks: TaskProps[] | []
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    readTask: (state: initialProps, action: PayloadAction<TaskProps[]>) => {
      state.tasks = action.payload
    },
  },
})

export const { readTask } = taskSlice.actions

export default taskSlice.reducer
