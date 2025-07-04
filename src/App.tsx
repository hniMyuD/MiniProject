import { BrowserRouter } from "react-router"
import { AuthProvider } from './context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AppRoutes } from "./routes/AppRoutes";
import './i18n'

function App() {
  const googleClientId = "1069084558543-i0d2655sqs788d9fgs37h2ndkg0g1ka5.apps.googleusercontent.com";
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


