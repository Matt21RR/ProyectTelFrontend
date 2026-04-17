import { useState } from "react";
import { MenuButton, SectionButton } from "../components/Button";
import MenuPrincipal from "./MenuPrincipal";

function BookCard(){
  return <div className="w-48 h-72 bg-white rounded-sm shadow-lg flex flex-col mx-auto">
    <div className="w-full h-2/3 bg-gray-300 rounded-t-md"/>
    <div className="w-full min-h-1/3 max-h-fit p-2 flex flex-col">
      <span className="font-semibold text-md">Nombre del libro</span>
      <span className="text-sm text-gray-700">Autor del libro</span>
      <span className="text-sm text-gray-700">Carrera: 5to</span>
      <span className="text-sm text-gray-700">Semestre: 5to</span>
    </div>
  </div>
}

export default function Principal(){
  const [openMenuCount, setOpenMenuCount] = useState(0);
  const [section, setSection] = useState("general");
  const abrirMenu = ()=>{
    setOpenMenuCount(openMenuCount + 1);
  }

  const showGeneral = ()=>{
    setSection("general");
  }

  const showRecomendados = ()=>{
    setSection("recomendados");
  }

  const TopBar =  () => {
    return <div className="bg-red-600 w-full h-14 flex items-center">
      <MenuButton action={abrirMenu}/>
      <SectionButton label="General" action={showGeneral} isActive={section === "general"}/>
      <SectionButton label="Recomendados" action={showRecomendados} isActive={section === "recomendados"}/>
    </div>
  }
  return <div className="w-full h-full bg-gray-200 flex flex-col">
    <TopBar/>
    <MenuPrincipal openMenuCount={openMenuCount}/>
    
    <div className="w-full h-auto p-4 overflow-auto">
      <div className="w-full grid grid-cols-5 gap-4 px-4">
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>

      </div>
    </div>

  </div>
}