import { useState } from "react";
import Input from "../components/Input"
import {Button} from "../components/Button";
import { apiRequest, REQUEST_METHODS } from "../misc/Misc";

export default function IniciarSesion() {
  const [usernameOrPassword, setUsernameOrPassword] = useState("");
  const [pass, setPass] = useState("");

  const iniciarSesion = ()=>{
    apiRequest(REQUEST_METHODS.POST,"login",{usernameOrPassword,pass})
      .then(res=>{});
  }

  return (
    <div className=" min-lg:w-[64rem] w-full border-gray-600 border-2  h-full flex mx-auto">
      <form className="w-full content-center flex flex-col items-center justify-between my-auto h-9/12 max-h-[500px]">
        <h1 className="text-4xl">Iniciar Sesion</h1>
        <div className="flex flex-col">
          <Input onChange={setUsernameOrPassword} placeholder="Nombre de usuario o correo"/>
          <Input onChange={setPass} type="password" placeholder="Contraseña"/>
        </div>
        
        <Button label="Ingresar" action={iniciarSesion}/>
      </form>
    </div>
  )
}
