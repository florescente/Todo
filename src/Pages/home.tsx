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
import { readTask, createTask, deleteTask } from '../redux/taskSlice'
import { BsCheck2Square, BsTrash } from 'react-icons/bs'
import { getLoadTasks } from '../redux/authSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'

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
    loadingTasks: boolean
  }
}

function Home() {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const user = useSelector((state: User) => state.auth.id)

  const loadingTasks = useSelector((state: User) => state.auth.loadingTasks)

  const docRef = collection(db, 'users', user, 'tasks')

  const updateTasks = async (id: string, value: boolean) => {
    const taskDoc = doc(db, 'users', user, 'tasks', id)
    await updateDoc(taskDoc, { checked: value })
  }

  const deleteTasks = async (id: string) => {
    const taskDoc = doc(db, 'users', user, 'tasks', id)
    await deleteDoc(taskDoc)
    dispatch(deleteTask(id))
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
    getTasks().then(() => {
      dispatch(getLoadTasks(false))
    })
  }, [user])

  const tasks = useSelector((state: TasksProps) => state.task.tasks)

  const schema = yup.object().shape({
    name: yup.string().required(),
  })

  const { register, reset, handleSubmit } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
    reset()
  }

  if (loadingTasks) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: 'calc(100vh - 56px)' }}
      >
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
          <Form.Control placeholder={t('taskName')} {...register('name')} />
        </Form.Group>
        <Button type="submit">{t('createTask')}</Button>
      </Form>
      <div className="table-responsive">
        <Table hover className="my-5 mw-100">
          <thead className="table-primary">
            <tr>
              <th className="text-success">
                <BsCheck2Square />
              </th>
              <th>{t('tasks')}</th>
              <th className="text-center">
                <BsTrash />
              </th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {tasks?.map((task: TaskProps) => (
              <tr key={task.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    defaultChecked={task.checked}
                    onChange={(e) => updateTasks(task.id, e.target.checked)}
                  />
                </td>
                <td className="align-middle">{task.name}</td>
                <td className="text-center">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline-danger"
                    onClick={() => deleteTasks(task.id)}
                  >
                    <BsTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Home
