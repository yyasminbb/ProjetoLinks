
import {Header} from "../../components/Header"; 
import {Imput} from "../../components/Imput";
import {useEffect, useState} from 'react'; 
import type{FormEvent} from 'react'; 

import {db} from "../../services/firebaseConnection"; 
import {
    setDoc, // cria  o documento e nos colocamos o id 
    doc, // cria item com id aleatorio 
    getDoc // buscar uma vez, uma tabela 
}from "firebase/firestore"; 

export function RedesSociais(){
    
    const [facebook, setFacebook] = useState(''); 
    const [instagran, setInstagran] = useState(''); 
    const [youtube, setYoutube] = useState('');

    useEffect(()=>{
        function loadLinks(){
           
            const docRef = doc(db, 'social', 'link');
            getDoc(docRef)
            .then((snapshot)=>{
                if(snapshot.data() !== undefined){
                    setFacebook(snapshot.data()?.facebook); 
                    setInstagran(snapshot.data()?.instagran); 
                    setYoutube(snapshot.data()?.youtube);  
                    
                }
            })
            .catch(()=>{
                alert('ERRO DE CARREGAMENTO');
            })
        }
        loadLinks()
    },[])
    
        function registrarForm(e: FormEvent){
            e.preventDefault(); 
            
            // addDoc faz uma lista, setDoc sobreescreve por cima 
            setDoc(doc(db, "social", "link"), { // banco, tabela, nome do documento (ID)
                facebook: facebook, 
                instagran: instagran, 
                youtube: youtube 
            })
            .then(() =>{
                alert('CADASTRADOS COM SUCESSO!');
                setFacebook(''); 
                setInstagran(''); 
                setYoutube(''); 
            })
            .catch(() =>{
                alert('ERRO AO SALVAR');
            }) 
        }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/> 

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form className="flex flex-col max-w-xl w-full pl-3 pr-3" onSubmit={registrarForm}>

                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Imput
                type="url"
                placeholder="Digite a url do facebook..."
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2">Link do Instagran</label>
                <Imput
                type="url"
                placeholder="Digite a url do instagran..."
                value={instagran}
                onChange={(e) => setInstagran(e.target.value)}/>

                <label className="text-white font-medium mt-2 mb-2">Link do Youtube</label>
                <Imput
                type="url"
                placeholder="Digite a url do youtube..."
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}/>

                
                <button  
                type="submit"
                className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex md-7 font-medium cursor-pointer">
                    Salvar links
                </button>
            </form>
        </div>
    )
}