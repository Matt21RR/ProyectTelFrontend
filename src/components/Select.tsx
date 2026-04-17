type SelectProps = {
  options: Array<[string,any]>; //opt label : value
  onChange:(value:any)=>void;
  label?:string
  selected?: any;
}


export default function Select(props:SelectProps){
  const id = window.performance.now() + Math.random() + "InputId";
  return <div className="flex flex-col">
    {props.label ? <span className="text-gray-700">{props.label}</span> : null}
    <select 
      value={props.selected? props.selected : props.options[0][1]}
      name={id} 
      onChange={(e)=>props.onChange( typeof props.options[0][1] === "number" ? parseFloat(e.target.value) : e.target.value )} 
      className=" w-64 h-8 rounded-md border border-b-gray-700 px-2 m-2 mt-1 cursor-pointer">

        {props.options.map((option)=>{
          return <option value={option[1]}>
            {option[0]}
          </option>
        })}

    </select>
  </div>
}