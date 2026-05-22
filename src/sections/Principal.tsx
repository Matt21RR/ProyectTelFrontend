import { useEffect, useState } from "react";
import { ButtonWhite, MenuButton, SectionButton } from "../components/Button";
import MenuPrincipal from "./MenuPrincipal";
import { apiRequest, BACKEND_URLS, REQUEST_METHODS } from "../misc/Misc";
import Input from "../components/Input";
import LibroInfo from "./LibroInfo";

type BookCardProps = {
  title: string;
  authors: Array<string>;
  action: () => void;
}

function BookCard(props: BookCardProps){
  return <div className="w-52 h-80 bg-white rounded-sm shadow-lg flex flex-col mx-auto select-none cursor-pointer" onClick={props.action}>
    <div className="w-full h-0 bg-gray-300 rounded-t-md"/>
    <div className="w-full h-full p-2 flex flex-col">
      <span className="font-semibold text-md">{props.title}</span>
      <span className="text-sm text-gray-700 mt-auto">{props.authors.join(", ")}</span>
    </div>
  </div>
}

export default function Principal(){
  const [openMenuCount, setOpenMenuCount] = useState(0);
  const [section, setSection] = useState("general");
  const [libros, setLibros] = useState<Array<{[key:string]:any}>>([]);

  const [tituloFiltro, setTituloFiltro] = useState("");

  const [openCargarLibrosId, setOpenCargarLibrosId] = useState("");

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

  const showFavoritos = ()=>{
    setSection("favoritos");
    obtenerFavoritos();
  }

  const obtenerLibros = ()=>{
    apiRequest(REQUEST_METHODS.GET, BACKEND_URLS.LIBRARY, "Books?pageSize=50", {})
      .then(res=>{
        setLibros(res as Array<{[key:string]:any}>);
        console.log(res);
      })
      .catch(err=>{
        console.error(err);
      });
  };

  const obtenerFavoritos = ()=>{
    apiRequest(REQUEST_METHODS.GET, BACKEND_URLS.INTERACTION, "UserFavorite/list",{})
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

  const abrirLibroInfo = (libroId: string)=>{
    setOpenCargarLibrosId(libroId);
  }

  return  <div className="w-full h-full flex flex-col">
            <div className=" bg-sky-800 w-full h-14 flex items-center">
              <MenuButton action={abrirMenu}/>
              <SectionButton label="General" action={showGeneral} isActive={section === "general"}/>
              <SectionButton label="Recomendados" action={showRecomendados} isActive={section === "recomendados"}/>
              <SectionButton label="Favoritos" action={showFavoritos} isActive={section === "favoritos"}/>
              <div className="ml-auto flex items-center gap-2 mr-4">
                <Input 
                  style="border-gray-300 text-gray-100 focus:border-gray-500 focus:ring-gray-500"
                  type="text" placeholder="Buscar libros" onChange={setTituloFiltro}/>
                <ButtonWhite label="Buscar" action={buscarLibros}/>
              </div>
            </div>
            <MenuPrincipal openMenuCount={openMenuCount}/>
            
            <div className="w-full h-auto p-4 overflow-auto">
              <div className="w-full grid xl:grid-cols-5  lg:grid-cols-4 grid-cols-3 gap-4 px-4">
                {libros.map((libro:any, index:number)=>{
                  return <BookCard key={index} title={libro.title} authors={libro.authors} action={ ()=>abrirLibroInfo(libro.id) }/>
                })}

              </div>
            </div>

            { openCargarLibrosId ? <LibroInfo openLibroInfoId={openCargarLibrosId} closeAction={ ()=>setOpenCargarLibrosId("") }/> : null}

          </div>
}