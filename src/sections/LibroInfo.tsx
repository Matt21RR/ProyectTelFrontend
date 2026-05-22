import { useEffect, useRef, useState} from "react";
import { Button, CrossButton } from "../components/Button";
import { apiRequest, BACKEND_URLS, REQUEST_METHODS } from "../misc/Misc";
import gsap from "gsap";

type LibroInfoProps = {
  openLibroInfoId: string;
  closeAction: () => void;
};

type LibroInfoData = {
    id : string ;
    isbn? : string;
    title : string ;
    classification? : string;
    language? : string;
    year? : string;
    summary? : string;
    
    // Aplanamos las listas: en vez de objetos completos, enviamos solo los nombres
    authors : Array<string>;
    topics : Array<string>;
};

export default function LibroInfo(props: LibroInfoProps) {
  const cargarRef = useRef<HTMLDivElement>(null);
  const cargarBackRef = useRef<HTMLDivElement>(null);
  const centralCargarRef = useRef<HTMLDivElement>(null);

  // Estado para manejar el archivo seleccionado
  const [info, setInfo] = useState<LibroInfoData>({ id: "", title: "", authors: [], topics: [] });
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    closeMenuInstant();
  }, []);

  useEffect(() => {
    if (props.openLibroInfoId !== "") {
      abrirMenu();
      obtenerLibroInfo();
      obtenerSiFavorito();
    }
  }, [props.openLibroInfoId]);

  const obtenerLibroInfo = ()=>{
    apiRequest(REQUEST_METHODS.GET, BACKEND_URLS.LIBRARY, `Books/${props.openLibroInfoId}`, {})
      .then(res=>{
        setInfo(res as LibroInfoData);
        console.log(res);
      })
      .catch(err=>{
        console.error(err);
      });
  };

  const obtenerSiFavorito = ()=>{
    apiRequest(REQUEST_METHODS.GET, BACKEND_URLS.INTERACTION, `UserFavorite/check/${props.openLibroInfoId}`, {})
      .then(res=>{
        console.log("Es favorito?", res);
        setEsFavorito(res as boolean);
      })
      .catch(err=>{
        console.error(err);
      });
  };

  const agregarAFavoritos = ()=>{
    apiRequest(REQUEST_METHODS.POST, BACKEND_URLS.INTERACTION, `UserFavorite/save/${info.id}`, {})
      .then(()=>{
        alert("Libro añadido a favoritos");
      })
      .catch(err=>{
        console.error(err);
        alert("Error al añadir a favoritos");
      });
  };



  const closeMenuInstant = () => {
    gsap.set(centralCargarRef.current, { x: -300 });
    gsap.set(cargarBackRef.current, { opacity: 0 });
    cargarRef.current?.classList.add("hidden");
  };

  const abrirMenu = () => {
    gsap.to(centralCargarRef.current, { x: 0, duration: 0.3 });
    gsap.to(cargarBackRef.current, { opacity: 0.3, duration: 0.3 });
    cargarRef.current?.classList.remove("hidden");
  };

  const cerrarMenu = () => {
    gsap.to(centralCargarRef.current, { x: -2000, duration: 0.3 });
    gsap.to(cargarBackRef.current, { opacity: 0, duration: 0.3 });
    setTimeout(() => {
      cargarRef.current?.classList.add("hidden");
      props.closeAction();
    }, 300);
  };

  return (
    <div className="absolute w-full h-full top-0 flex" ref={cargarRef}>
      <div 
        className="bg-black opacity-30 w-full h-full absolute top-0 left-0" 
        ref={cargarBackRef} 
        onClick={cerrarMenu} 
      />
      
      <div 
        className="border-x h-full lg:w-[64rem] w-full shadow-2xl mx-auto bg-white flex flex-col" 
        ref={centralCargarRef}
      >
        <div className="w-full h-fit flex p-2 border-b">
          <CrossButton color="bg-gray-700" action={cerrarMenu} />
          <h1 className="my-auto ml-4 font-bold text-lg">Información del libro</h1>
        </div>

        {/* Zona de Drop y Formulario */}
        <div className={`flex-1 m-4 rounded-xl flex flex-col overflow-auto`}>
          <div className="w-full h-auto p-4 overflow-auto">
            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3 h-64 bg-gray-300 rounded-md">
                <img src={`https://covers.openlibrary.org/b/isbn/${info.isbn}-S.jpg`} />
              </div>
              <div className="w-full md:w-2/3 h-full flex flex-col">
                <span className="font-semibold text-2xl">{info.title}</span>
                <span className="text-md text-gray-700">Autores: {info.authors.join(", ")}</span>
                <span className="text-md text-gray-700">ISBN: {info.isbn}</span>
                <span className="text-md text-gray-700">Año: {info.year}</span>
                <span className="text-md text-gray-700">Idioma: {info.language}</span>
                <span className="text-md text-gray-700">Clasificación: {info.classification}</span>
                <span className="text-md text-gray-700">Temas: {info.topics.join(", ")}</span>
              </div>
            </div>
            <div className="w-full h-px bg-gray-300 my-4"/>
            <div className="w-full h-auto py-2 overflow-auto">
                <span className="font-semibold text-2xl mt-4">Resumen</span>
                <p className="text-md text-gray-700 mt-2">{info.summary}</p>
            </div>
          </div>
        </div>

        <div className="p-4 w-full flex justify-end border-t">
          {esFavorito ? (
            <Button label="Eliminar de favoritos" action={()=>{}} />
          ) : (
            <Button label="Añadir a favoritos" action={agregarAFavoritos} />
          )}
        </div>
      </div>
    </div>
  );
}