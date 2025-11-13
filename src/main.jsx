import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BibliophileBookstore from './BookStore.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BibliophileBookstore />
  </StrictMode>,
)
