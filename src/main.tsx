import React from 'react'
import ReactDOM from 'react-dom/client'
import AppWrapper from './AppRedux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
)
