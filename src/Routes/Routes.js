import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Post from "../components/Post/Post";
import Signup from "../components/Signup/Signup";
import Main from "../layout/Main";
import ProtectedRoutes from "./ProtectedRoutes";

export const router = createBrowserRouter([
    {path:"/", element:<Main></Main>,
 
    children:[
        {path:'/', element:<Home></Home>},
        {path:'/signup', element:<Signup></Signup>},
        {path:'/post', element:<ProtectedRoutes><Post></Post></ProtectedRoutes> }
    ]


}
])