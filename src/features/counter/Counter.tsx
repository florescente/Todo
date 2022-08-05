import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './counterSlice'

interface RootState {
  counter: {
    count: number
  }
}

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.count)
  const dispatch = useDispatch()
  return (
    <div>
      <p>{count}</p>
      <div>
        <button type="button" onClick={() => dispatch(increment())}>
          +
        </button>
        <button type="button" onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
    </div>
  )
}

export default Counter