import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import theme from './layout/theme.ts'
import { ThemeProvider } from '@mui/material'
createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>
)
