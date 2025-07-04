import { BrowserRouter } from "react-router"
import { AuthProvider } from '@context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AppRoutes } from "@routes/AppRoutes";
import './i18n'

function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';
  return (
    <>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
