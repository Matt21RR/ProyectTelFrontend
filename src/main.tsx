import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import IniciarSesion from './sections/IniciarSesion'
import { readSession, writeSession } from './misc/Misc'
import CrearCuenta from './sections/CrearCuenta'
import Principal from './sections/Principal'

if(readSession("section") === null){
  //Si no hay sección en sesión, se asume que es la de login
  writeSession("section", "login");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {["crearCuenta", "login"].includes(readSession("section")!) ? (
      <div className=" min-lg:w-[54rem] w-full shadow-2xl h-full flex mx-auto bg-white">
        {readSession("section") === "crearCuenta" ? <CrearCuenta /> : null}
        {readSession("section") === "login" ? <IniciarSesion /> : null} 
      </div>
    ) : null}
    {readSession("section") === "principal" ? <Principal/> : null}
  </StrictMode>,
)
