import { useState } from "react";
import Input from "../components/Input"
import {Button} from "../components/Button";
import { apiRequest, BACKEND_URLS, REQUEST_METHODS, writeSession } from "../misc/Misc";

export default function IniciarSesion() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPass] = useState("");

  const iniciarSesion = ()=>{
    apiRequest(REQUEST_METHODS.POST, BACKEND_URLS.AUTH, "Auth/login", {usernameOrEmail, password})
      .then(res=>{
        alert("Inicio de sesión exitoso");
        //@ts-ignore
        writeSession("token", res.accessToken);
        //@ts-ignore
        writeSession("user", res.username);
        //@ts-ignore
        writeSession("userId", res.id);
        //@ts-ignore
        writeSession("carrera", res.career);
        //@ts-ignore
        writeSession("semestre", res.semester);

        //@ts-ignore
        if(res.roles.includes("Admin")){
          //@ts-ignore
          writeSession("isAdmin", "true");
        }else{
          //@ts-ignore
          writeSession("isAdmin", "false");
        }
        //Reload para mostrar el menu principal, o redirigir a menu principal
        writeSession("section", "principal");
        window.location.reload();

      })
      .catch(()=>{
        alert("Error al iniciar sesión");
      });
  }

  return (
      <form className="w-full content-center flex flex-col items-center justify-between my-auto h-9/12 max-h-[500px]">
        <h1 className="text-5xl">Iniciar Sesion</h1>
        <div className="flex flex-col">
          <Input onChange={setUsernameOrEmail} placeholder="Nombre de usuario o correo"/>
          <Input onChange={setPass} type="password" placeholder="Contraseña"/>
        </div>
        
        <div className="flex gap-2">
          <Button label="Ingresar" action={iniciarSesion}/>
          <Button label="Crear Cuenta" action={() =>{ 
            writeSession("section", "crearCuenta");
            window.location.reload();
            }}/>
        </div>
      </form>
  )
}
