import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import db from '../firebase-config'

interface TaskProps {
  checked: boolean
  name: string
}

function Home() {
  const [tasks, setTasks] = React.useState<TaskProps[]>([])

  const docRef = doc(db, 'users', 'DPgdT4zcwiEoHcpwoL8K')

  React.useEffect(() => {
    const getTasks = async () => {
      const data = await getDoc(docRef)
      setTasks(data.get('tasks'))
    }
    getTasks()
  }, [])
  return (
    <div className="container">
      <h2>Tasks</h2>
      {tasks.map((task: TaskProps, index) => (
        <React.Fragment key={index}>
          <h3>{task.name}</h3>
          <h4>{task.checked.toString()}</h4>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Home
