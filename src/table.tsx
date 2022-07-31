import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import React from 'react'
import db from './firebase-config'

function Table() {
  const [newName, setNewName] = React.useState('')
  const [newBody, setNewBody] = React.useState('')
  const [tasks, setTasks] = React.useState<any>([])
  const tasksRef = collection(db, 'tasks')

  const createTasks = async () => {
    await addDoc(tasksRef, { name: newName, body: newBody })
  }

  const updateTasks = async (id: string) => {
    const taskDoc = doc(db, 'tasks', id)
    await updateDoc(taskDoc, { body: 'changed' })
  }

  const deleteTasks = async (id: string) => {
    const taskDoc = doc(db, 'tasks', id)
    await deleteDoc(taskDoc)
  }

  React.useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksRef)
      setTasks(data.docs.map((tk) => ({ ...tk.data(), id: tk.id })))
    }
    getTasks()
  }, [])
  return (
    <div>
      <input
        placeholder="Name..."
        onChange={(e) => {
          setNewName(e.target.value)
        }}
      />
      <input
        placeholder="Body..."
        onChange={(e) => {
          setNewBody(e.target.value)
        }}
      />
      <button type="button" onClick={createTasks}>
        New Task
      </button>
      {tasks.map((task: any) => (
        <div key={task.id}>
          <h1>Nome: {task.name}</h1>
          <h1>Body: {task.body}</h1>
          <button
            type="button"
            onClick={() => {
              updateTasks(task.id)
            }}
          >
            Change Body
          </button>
          <button
            type="button"
            onClick={() => {
              deleteTasks(task.id)
            }}
          >
            Delete Task
          </button>
        </div>
      ))}
    </div>
  )
}

export default Table
