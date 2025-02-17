import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx'


const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID;

if (!clientId) {
  throw new Error('Missing VITE_OAUTH_CLIENT_ID in .env file');
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <GoogleOAuthProvider clientId={clientId}>
        <App />
    </GoogleOAuthProvider>
    
  </StrictMode>
)
