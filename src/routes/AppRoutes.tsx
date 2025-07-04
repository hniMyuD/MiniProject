import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "@pages/HomePage";
import { SignUp } from "@pages/SignUp";
import { Login } from "@pages/Login";
import { ProtectedRoute } from "@routes/ProtectedRoute";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/signup" element={<SignUp />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/homepage" element={<HomePage />} />
            </Route>
        </Routes>

    )
}