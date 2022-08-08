import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import db from '../firebase-config'
import { readTask } from '../redux/taskSlice'

interface TaskProps {
  checked: boolean
  name: string
}

interface TasksProps {
  task: {
    tasks: TaskProps[]
  }
}

function Home() {
  const dispatch = useDispatch()

  const docRef = doc(db, 'users', 'DPgdT4zcwiEoHcpwoL8K')

  React.useEffect(() => {
    const getTasks = async () => {
      const data = await getDoc(docRef)
      dispatch(readTask(data.get('tasks')))
    }
    getTasks()
  }, [])

  const tasks = useSelector((state: TasksProps) => state.task.tasks)
  return (
    <div className="container">
      <h2>Tasks</h2>
      {tasks?.map((task: TaskProps, index) => (
        <React.Fragment key={index}>
          <h3>{task.name}</h3>
          <h4>{task.checked.toString()}</h4>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Home
