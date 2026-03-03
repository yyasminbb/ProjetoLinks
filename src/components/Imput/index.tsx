
import type {InputHTMLAttributes} from 'react'; 

interface ImputProps extends InputHTMLAttributes<HTMLInputElement>{

}

export function Imput(props: ImputProps){
    return(
        <input 
        placeholder="teste..."
        className="border-0 h-9 rounded-md outline-none px-2 mb-3 bg-white"
        {...props}/>
    )
}