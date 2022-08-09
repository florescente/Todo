import { collection, getDocs } from 'firebase/firestore'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import Table from 'react-bootstrap/esm/Table'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import db from '../firebase-config'
import { readTask } from '../redux/taskSlice'

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

function Home() {
  const dispatch = useDispatch()

  const docRef = collection(db, 'testes', 'mK9SoJrefIULa5zhSK0n', 'teste')

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
  }, [])

  const tasks = useSelector((state: TasksProps) => state.task.tasks)

  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data.name)
    //try firestore create and dispatch action or show error
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
            <th>#</th>
            <th>Done</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task: TaskProps, index) => (
            <tr key={task.id}>
              <td>{index}</td>
              <td>{task.checked?.toString()}</td>
              <td>{task.name}</td>
              <td>del</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Home
