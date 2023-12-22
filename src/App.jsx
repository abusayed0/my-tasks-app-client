
import { RouterProvider } from 'react-router-dom'
import './App.css'
import routes from './router/routes'
import { Toaster } from 'react-hot-toast'

function App() {


  return (
    <div className="max-w-[1920px] mx-auto">
      <RouterProvider router={routes}>
      </RouterProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
