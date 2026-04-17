import { useEffect, useState, useMemo } from "react";
import { Button, MenuButton, SectionButton } from "../components/Button";
import MenuPrincipal from "./MenuPrincipal";
import { apiRequest, BACKEND_URLS, REQUEST_METHODS } from "../misc/Misc";
import Input from "../components/Input";

type BookCardProps = {
  title: string;
  authors: Array<string>;
}

function BookCard(props: BookCardProps){
  return <div className="w-48 h-72 bg-white rounded-sm shadow-lg flex flex-col mx-auto">
    <div className="w-full h-2/3 bg-gray-300 rounded-t-md"/>
    <div className="w-full max-h-fit p-2 flex flex-col">
      <span className="font-semibold text-md">{props.title}</span>
      <span className="text-sm text-gray-700">{props.authors.join(", ")}</span>
      <span className="text-sm text-gray-700">Carrera: 5to</span>
      <span className="text-sm text-gray-700">Semestre: 5to</span>
    </div>
  </div>
}

export default function Principal(){
  const [openMenuCount, setOpenMenuCount] = useState(0);
  const [section, setSection] = useState("general");
  const [libros, setLibros] = useState<Array<{[key:string]:any}>>([]);

  const [tituloFiltro, setTituloFiltro] = useState("");

  useEffect(()=>{
    obtenerLibros();
  },[]);


  const abrirMenu = ()=>{
    setOpenMenuCount(openMenuCount + 1);
  }

  const showGeneral = ()=>{
    setSection("general");
    obtenerLibros();
  }

  const showRecomendados = ()=>{
    setSection("recomendados");
  }

  const obtenerLibros = ()=>{
    apiRequest(REQUEST_METHODS.GET, BACKEND_URLS.LIBRARY, "Books", {})
      .then(res=>{
        setLibros(res as Array<{[key:string]:any}>);
        console.log(res);
      })
      .catch(err=>{
        console.error(err);
      });
  };

  const buscarLibros = ()=>{
    apiRequest(REQUEST_METHODS.GET, BACKEND_URLS.LIBRARY, `Books/search?name=${tituloFiltro}`, {})
      .then(res=>{
        setLibros(res as Array<{[key:string]:any}>);
        console.log(res);
      }
      )
      .catch(err=>{
        console.error(err);
      });
  }

  // const TopBar = useMemo(() => {
  //   return () => (

  //   );
  // }, []);

  return <div className="w-full h-full bg-gray-200 flex flex-col">
          <div className="bg-red-600 w-full h-14 flex items-center">
        <MenuButton action={abrirMenu}/>
        <SectionButton label="General" action={showGeneral} isActive={section === "general"}/>
        <SectionButton label="Recomendados" action={showRecomendados} isActive={section === "recomendados"}/>
        <div className="ml-auto flex items-center gap-2 mr-4">
          <Input type="text" placeholder="Buscar libros" onChange={setTituloFiltro}/>
          <Button label="Buscar" action={buscarLibros}/>
        </div>
      </div>
    <MenuPrincipal openMenuCount={openMenuCount}/>
    
    <div className="w-full h-auto p-4 overflow-auto">
      <div className="w-full grid grid-cols-5 gap-4 px-4">
        {libros.map((libro:any, index:number)=>{
          return <BookCard key={index} title={libro.title} authors={libro.authors}/>
        })}

      </div>
    </div>

  </div>
}