
import {auth} from  '../services/firebaseConnection'; 
import {onAuthStateChanged} from 'firebase/auth'; 
import type { ReactNode } from 'react';
import {useState, useEffect} from 'react'; 
import{Navigate} from 'react-router-dom';

interface PrivateProps{
    children: ReactNode; 
}

export function Private({children}: PrivateProps) : any{

    const [loading, setLoading] = useState(true);  // carregando pagina
    const [signed, setSigned] = useState(false) // tem usuario logado?
    
    useEffect(()=>{ // quando carregar a pagina 
        const unSub = onAuthStateChanged(auth, (user) => { // outh nossoa conexão, user se tem usuario logado ou nao 

            if(user){
                const userDados = {
                    uid: user?.uid, 
                    email: user?.email
                }

                localStorage.setItem('@reactlink', JSON.stringify(userDados)); 
                setLoading(false) // pagina não esta mais carregando 
                setSigned(true) // usuario esta logado
            }else{
                setLoading(false) 
                setSigned(false)
            }
        })

        return () =>{ // quando estiver saindo,  pare de ficar monitorando para não perder performace
            unSub(); 
        }
    },[])

    if(loading){
        return <div></div>
    }

    if(!signed){
        return <Navigate to='/login'/>
    }
    return children; 
}