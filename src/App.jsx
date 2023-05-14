import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import Destination from "./page/destination/Destination";
import Tour from "./page/tour/Tour";
import New from "./page/new/New";
import Blog from "./page/blog/Blog";
import DestinationUpdate from "./page/destination/DestinationUpdate";
import TourUpdate from "./page/tour/TourUpdate";
import BlogUpdate from "./page/blog/BlogUpdate";
import Contact from "./page/contact/Contact";
function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <DefaultLayout/>,
  //     children: [
  //       {
  //         path: '',
  //         element: <Home/>
  //       },
  //       {
  //         path: 'destinations',
  //         element: <Destination/>
  //       },
  //       {
  //         path: 'destinations/add',
  //         element: <New type='destination'/>,
  //       },
  //       {
  //         path: 'tours',
  //         element: <Tour/>,
  //       },
  //       {
  //         path: 'tours/add',
  //         element: <New type='tour'/>,
  //       },
  //       {
  //         path: 'blogs',
  //         element: <Blog/>
  //       },
  //       {
  //         path: 'blogs/add',
  //         element: <New type={'blog'}/>
  //       },
  //     ]
  //   },
  //   {
  //     path: '/login',
  //     element: <Login/>
  //   }
  // ])
  return (
    // <RouterProvider router={router}/>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/destinations"
          element={
            <DefaultLayout>
              <Destination />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/tours"
          element={
            <DefaultLayout>
              <Tour />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/blogs"
          element={
            <DefaultLayout>
              <Blog />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/destinations/add"
          element={
            <DefaultLayout>
              <New type={"destination"} />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/tours/add"
          element={
            <DefaultLayout>
              <New type={"tour"} />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/blogs/add"
          element={
            <DefaultLayout>
              <New type={"blog"} />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/destinations/update/:id"
          element={
            <DefaultLayout>
              <DestinationUpdate />
            </DefaultLayout>
          }
        ></Route>
         <Route
          path="/tours/update/:id"
          element={
            <DefaultLayout>
              <TourUpdate />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/blogs/update/:id"
          element={
            <DefaultLayout>
              <BlogUpdate />
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/contact"
          element={
            <DefaultLayout>
              <Contact />
            </DefaultLayout>
          }
        ></Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
