import { useEffect, useRef, useState } from "react";
import {Button, MenuButton} from "../components/Button"
import Select from "../components/Select"
import { CARRERAS, SEMESTRES } from "../misc/FilteringInfo"
import { apiRequest, REQUEST_METHODS } from "../misc/Misc";
import gsap from "gsap";


type MenuPrincipalProps = {
  openMenuCount:number
}

export default function MenuPrincipal(props:MenuPrincipalProps){ //TODO add props to update Principal -> Libros recomendados list, on preferences change
  const [carrera, setCarrera] = useState(0);
  const [semestre, setSemestre] = useState(1);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBackRef = useRef<HTMLDivElement>(null);
  const lateralMenuRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    closeMenuInstant();
  }
  ,[]);
  const closeMenuInstant = ()=>{
    gsap.set(lateralMenuRef.current,{x:-300});
    gsap.set(menuBackRef.current,{opacity:0});
    if(menuRef.current){
      menuRef.current.classList.add("hidden");
    }
  }

  useEffect(()=>{
    if(props.openMenuCount > 0){
      abrirMenu();
    }
  },[props.openMenuCount]);

  const abrirMenu = ()=>{
    gsap.to(lateralMenuRef.current,{x:0, duration:0.3});
    gsap.to(menuBackRef.current,{opacity:0.3, duration:0.3});
    if(menuRef.current){
      menuRef.current.classList.remove("hidden");
    }
  };

  const cerrarMenu = ()=>{
    gsap.to(lateralMenuRef.current,{x:-300, duration:0.3});
    gsap.to(menuBackRef.current,{opacity:0, duration:0.3});
    if(menuRef.current){
      setTimeout(()=>{
        menuRef.current?.classList.add("hidden");
      },300);
    }
  };

  const actualizarUsuario = ()=>{
    apiRequest(REQUEST_METHODS.POST,"update",{carrera,semestre})
      .then(res=>{});
  }
  const cerrarSesion = ()=>{
    apiRequest(REQUEST_METHODS.POST,"logout",{})
      .then(res=>{
        //TODO: Change the view to show, use SESSION storage to check if user is logged in or not, and remove session on logout
        window.location.reload();
      });
  }


  return <div className="absolute w-full h-full top-0" ref={menuRef}>
    <div className="bg-black opacity-30 w-full h-full absolute top-0 left-0" ref={menuBackRef} onClick={cerrarMenu}/>
    <div className="relative border-r h-full w-72 shadow-2xl absolute left-0 bg-white" ref={lateralMenuRef}>
      <div className="w-full h-fit flex">
        <MenuButton color="bg-gray-700" action={cerrarMenu}/>
        <h3 className="my-auto">MENÚ</h3>
      </div>

      <div className="w-full border-y items-center flex flex-col py-2">
        <Select onChange={setCarrera} options={CARRERAS}
          label="Carrera"
        />
        <Select onChange={setSemestre} options={SEMESTRES}
          label="Semestre"
        />
        <Button label="Actualizar" action={actualizarUsuario}/>
      </div>

      <div className="absolute bottom-4 right-4 w-full items-end flex flex-col">
        <Button label="Cerrar Sesion" action={cerrarSesion}/>
      </div>
    </div>

  </div>

}