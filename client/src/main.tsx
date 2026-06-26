import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import AppTheme from './components/mui/theme/AppTheme.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppTheme>
      <App />
      </AppTheme>
    </BrowserRouter>
  </StrictMode>,
)
