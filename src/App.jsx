
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Home from './page/home/Home'
import Login from './page/login/Login'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaultLayout/>,
      children: [
        {
          path: '',
          element: <Home/>
        },
      ]
    },
    {
      path: '/login',
      element: <Login/>
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
