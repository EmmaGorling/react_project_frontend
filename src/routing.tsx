import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./Pages/ProfilePage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                )
            }
        ]
    },
    
]);

export default router;