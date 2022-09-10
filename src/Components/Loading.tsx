import Spinner from 'react-bootstrap/esm/Spinner'

function Loading() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: 'calc(100vh - 56px)' }}
    >
      <Spinner animation="border" variant="primary" />
    </div>
  )
}

export default Loading
