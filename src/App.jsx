
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Home from './page/home/Home'
import Login from './page/login/Login'
import Destination from './page/destination/Destination'
import Tour from './page/tour/Tour'
import New from './page/new/New'
import Blog from './page/blog/Blog'

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
        {
          path: 'destinations',
          element: <Destination/>
        },
        {
          path: 'destinations/add',
          element: <New type='destination'/>,
        },
        {
          path: 'tours', 
          element: <Tour/>,
        },
        {
          path: 'tours/add',
          element: <New type='tour'/>,
        },
        {
          path: 'blogs',
          element: <Blog/>
        },
        {
          path: 'blogs/add',
          element: <New type={'blog'}/>
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
