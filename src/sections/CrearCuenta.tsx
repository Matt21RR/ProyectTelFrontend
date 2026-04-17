import { useState } from "react";
import Input from "../components/Input"
import {Button} from "../components/Button";
import { apiRequest, BACKEND_URLS, REQUEST_METHODS, writeSession } from "../misc/Misc";
import Select from "../components/Select";
import { CARRERAS, SEMESTRES } from "../misc/FilteringInfo";

export default function CrearCuenta(){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carrera, setCarrera] = useState(0);
  const [semestre, setSemestre] = useState(1);

  const crearCuenta = ()=>{
    apiRequest(REQUEST_METHODS.POST, BACKEND_URLS.AUTH, "Auth/register", {username, email, password, carrera, semestre})
      .then(res=>{
        alert("Cuenta creada exitosamente");
        //Reload para mostrar el login, o redirigir a login
        writeSession("section", "login");
        window.location.reload();
      });
  }

  return (
    <div className=" min-lg:w-[64rem] w-full border-gray-600 border-2  h-full flex mx-auto">
      <form className="w-full content-center flex flex-col items-center justify-between my-auto h-9/12 max-h-[500px]">
        <h1 className="text-4xl">Crear Cuenta</h1>
        <div className="flex flex-col">
          <Input onChange={setUsername} placeholder="Nombre de usuario"/>
          <Input onChange={setEmail} type="email" placeholder="Correo Electronico"/>
          <Input onChange={setPassword} type="password" placeholder="Contraseña"/>
          <Select onChange={setCarrera} options={CARRERAS}
            label="Carrera"
          />
          <Select onChange={setSemestre} options={SEMESTRES}
            label="Semestre"
          />
        </div>
        
        <div className="flex gap-2">
          <Button label="Crear" action={crearCuenta}/>
          <Button label="Inciar Sesion" action={() =>{ 
            writeSession("section", "login");
            window.location.reload();
            }}/>
        </div>
      </form>
    </div>
  )
}