import { useState } from "react";
import Input from "../components/Input"
import {Button} from "../components/Button";
import { apiRequest, REQUEST_METHODS } from "../misc/Misc";
import Select from "../components/Select";
import { CARRERAS, SEMESTRES } from "../misc/FilteringInfo";

export default function CrearCuenta(){
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [carrera, setCarrera] = useState(0);
  const [semestre, setSemestre] = useState(1);

  const crearCuenta = ()=>{
    apiRequest(REQUEST_METHODS.POST,"signUp",{user,pass})
      .then(res=>{});
  }

  return (
    <div className=" min-lg:w-[64rem] w-full border-gray-600 border-2  h-full flex mx-auto">
      <form className="w-full content-center flex flex-col items-center justify-between my-auto h-9/12 max-h-[500px]">
        <h1 className="text-4xl">Crear Cuenta</h1>
        <div className="flex flex-col">
          <Input onChange={setUser} placeholder="Nombre de usuario"/>
          <Input onChange={setPass} type="password" placeholder="Contraseña"/>
          <Select onChange={setCarrera} options={CARRERAS}
            label="Carrera"
          />
          <Select onChange={setSemestre} options={SEMESTRES}
            label="Semestre"
          />
        </div>
        
        <Button label="Crear" action={crearCuenta}/>
      </form>
    </div>
  )
}