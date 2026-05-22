type InputProps = {
  onChange:(value:string)=>void;
  type?: string;
  placeholder? : string;
  style?: string;
}

export default function Input (props: InputProps){
  const id = window.performance.now() + Math.random() + "InputId";

  return <input 
            type={props.type ?? "text"} 
            id={id}
            onChange={ev => props.onChange(ev.target.value)}
            className={`w-64 h-7 rounded-md border m-2  px-2 ${props.style ?? "border-b-gray-700"}`}
            placeholder={props.placeholder ?? ""}
            />
}