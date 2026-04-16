type ButtonProps = {
  label:string;
  action: ()=>void
}

export default function Button (props: ButtonProps){
  // const id = window.performance.now() + Math.random() + "InputId";

  return <div className=" cursor-pointer bg-blue-400 hover:bg-blue-500 flex w-44 rounded-md p-1" onClick={props.action}>
      <span className="m-auto">{props.label}</span>
    </div>
}