import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CrearCuenta from './sections/CrearCuenta.tsx'
import Principal from './sections/Principal.tsx'
import MenuPrincipal from './sections/MenuPrincipal.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Principal/>
  </StrictMode>,
)
