import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import React from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import Table from 'react-bootstrap/esm/Table'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import db from '../firebase-config'
import { readTask, createTask } from '../redux/taskSlice'
import { BsTrash } from 'react-icons/bs'

interface TaskProps {
  checked?: boolean
  name?: string
  id: string
}

interface TasksProps {
  task: {
    tasks: TaskProps[]
  }
}

type Inputs = {
  name: string
}

type User = {
  auth: {
    id: string
  }
}

function Home() {
  const dispatch = useDispatch()

  const user = useSelector((state: User) => state.auth.id)

  const docRef = collection(db, 'testes', user, 'teste')

  const updateTasks = async (id: string, value: boolean) => {
    const taskDoc = doc(db, 'testes', user, 'teste', id)
    await updateDoc(taskDoc, { checked: value })
    //dispatch
  }

  const deleteTasks = async (id: string) => {
    const taskDoc = doc(db, 'testes', user, 'teste', id)
    await deleteDoc(taskDoc)
    //dispatch
  }

  React.useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(docRef)
      const tasks: TaskProps[] = data.docs.map((tk) => ({
        ...tk.data(),
        id: tk.id,
      }))
      dispatch(readTask(tasks))
    }
    getTasks()
  }, [user])

  const tasks = useSelector((state: TasksProps) => state.task.tasks)

  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data.name)
    try {
      await addDoc(docRef, { name: data.name, checked: false }).then(
        (onfulfilled) => {
          dispatch(
            createTask({
              name: data.name,
              checked: false,
              id: onfulfilled.id,
            })
          )
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  if (user === 'bah') {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    )
  }
  return (
    <div className="container">
      <Form
        className="mt-5 d-flex justify-content-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group controlId="formCreateName">
          <Form.Control
            placeholder="Task Name"
            {...register('name', { required: true })}
          />
        </Form.Group>
        <Button type="submit">Create</Button>
      </Form>
      <Table striped hover className="my-5">
        <thead>
          <tr>
            <th>Done</th>
            <th>Name</th>
            <th>id</th>
            <th>del</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task: TaskProps) => (
            <tr key={task.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  defaultChecked={task.checked}
                  onChange={() => updateTasks(task.id, !task.checked)}
                />
              </td>
              <td>{task.name}</td>
              <td>{task.id}</td>
              <td>
                <Button type="button" onClick={() => deleteTasks(task.id)}>
                  <BsTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Home
