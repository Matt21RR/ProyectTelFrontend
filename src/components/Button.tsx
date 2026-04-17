

type ButtonProps = {
  label:string;
  action: ()=>void
}

export function Button (props: ButtonProps){
  // const id = window.performance.now() + Math.random() + "InputId";

  return <div className=" cursor-pointer text-white bg-blue-400 hover:bg-blue-500  transition duration-300 flex w-40 rounded-md p-2" onClick={props.action}>
      <span className="m-auto">{props.label}</span>
    </div>
}

export function ButtonWhite (props: ButtonProps){
  // const id = window.performance.now() + Math.random() + "InputId";

  return <div className=" cursor-pointer text-gra-700 bg-white hover:bg-gray-300  transition duration-300 flex w-40 rounded-md p-2" onClick={props.action}>
      <span className="m-auto">{props.label}</span>
    </div>
}

type MenuButtonProps = {
  color?:string
  action: ()=>void
}
export function MenuButton (props:MenuButtonProps){
  return <div className="w-8 h-8 flex flex-col justify-between py-1 m-2 cursor-pointer hover:rotate-90 transition duration-300" onClick={props.action}>
    <div className={`w-full h-1 ${props.color ?? "bg-white"} rounded-sm`}/>
    <div className={`w-full h-1 ${props.color ?? "bg-white"} rounded-sm`}/>
    <div className={`w-full h-1 ${props.color ?? "bg-white"} rounded-sm`}/>
  </div>
}

type SectionButtonProps = {
  label:string;
  isActive?:boolean;
  action: ()=>void;
}


export function SectionButton (props: SectionButtonProps){
  // const id = window.performance.now() + Math.random() + "InputId";

  return <div className={`cursor-pointer text-gray-100 hover:text-white hover:bg-black/15 ${props.isActive ? "bg-black/15 text-white" : ""} flex w-40 h-[80%] border-x border-white`} onClick={props.action}>
      <span className="m-auto font-semibold text-lg">{props.label}</span>
    </div>
}
