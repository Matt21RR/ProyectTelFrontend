import { useEffect, useRef, useState} from "react";
import { Button, MenuButton } from "../components/Button";
import { apiRequestWithFormData, BACKEND_URLS, REQUEST_METHODS } from "../misc/Misc";
import gsap from "gsap";

type CargarLibrosProps = {
  openCargarLibrosCount: number;
};

export default function CargarLibros(props: CargarLibrosProps) {
  const cargarRef = useRef<HTMLDivElement>(null);
  const cargarBackRef = useRef<HTMLDivElement>(null);
  const centralCargarRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado para manejar el archivo seleccionado
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    closeMenuInstant();
  }, []);

  useEffect(() => {
    if (props.openCargarLibrosCount > 0) {
      abrirMenu();
    }
  }, [props.openCargarLibrosCount]);

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
      // Limpiar el archivo al cerrar si lo deseas
      setSelectedFile(null); 
    }, 300);
  };


  const handleFile = (file: File) => {
    // Validar extensión si es necesario (ej. .iso)
    if (file.name.includes(".iso")) {
      setSelectedFile(file);
    } else {
      alert("Por favor, sube un archivo .iso");
    }
  };

  const onDropHandler = (event:any) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInputChange = (event:any) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const cargarLibros = () => {
    if (!selectedFile) {
      alert('Por favor selecciona o arrastra un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    console.log(formData.get('file')); // Verificar que el archivo se ha agregado correctamente

    apiRequestWithFormData(REQUEST_METHODS.POST, BACKEND_URLS.LIBRARY, 'UploadBooks/upload', formData)
      .then(() => {
        alert('Archivo subido exitosamente');
        cerrarMenu();
      })
      .catch(err => {
        alert('Error al subir el archivo');
        console.error(err);
      });
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
          <MenuButton color="bg-gray-700" action={cerrarMenu} />
          <h1 className="my-auto ml-4 font-bold text-lg">Panel para cargar libros</h1>
        </div>

        {/* Zona de Drop y Formulario */}
        <div 
          className={`flex-1 m-4 border-4 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDropHandler}
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <div className="text-center pointer-events-none">
            {selectedFile ? (
              <div className="text-green-600">
                <p className="font-semibold">Archivo seleccionado:</p>
                <p className="text-sm">{selectedFile.name}</p>
              </div>
            ) : (
              <p className="text-gray-500">
                Arrastra tu archivo <strong>.iso</strong> aquí <br /> o haz clic para buscar
              </p>
            )}
          </div>

          <input 
            type="file" 
            ref={fileInputRef}
            onChange={onInputChange} 
            accept=".iso*" 
            className="hidden" 
          />
        </div>

        <div className="p-4 w-full flex justify-end border-t">
          <Button label="Actualizar / Subir" action={cargarLibros} />
        </div>
      </div>
    </div>
  );
}