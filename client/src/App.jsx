import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Search from "./pages/Search";
import CourseDetail from "./pages/CourseDetail";
import CourseProgress from "./pages/CourseProgress";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./components/AdminRoute";
import CourseTable from "./pages/CourseTable";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import CreateLecture from "./pages/CreateLecture";
import EditLecture from "./pages/EditLecture";
import MyLearning from "./pages/MyLearning";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },{
        path:"my-learning",
        element:<ProtectedRoute><MyLearning/></ProtectedRoute>,
      },
      {
         path:""
      },
      {
        path: "course/search",
        element: <Search />,
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <CourseProgress />
          </ProtectedRoute>
        ),
      },
      {
        path: "instructor",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "courselist",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <CreateCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
