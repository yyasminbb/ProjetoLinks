
import {Header} from "../../components/Header"; 
import {Imput} from "../../components/Imput";
import { useState, useEffect } from "react";
import {FiTrash} from 'react-icons/fi';
import type {FormEvent} from  'react';

import {db} from '../../services/firebaseConnection'; 
import {
    addDoc,  // gera um id aleatorio 
    collection, // cria ou seleciona  uma nova coleção, tabela 
    onSnapshot, // esta sempre observando o banco de dados, sem precisar atualilzar a pagina ou fazer a chamada de funcao 
    query, // serve para busca 
    orderBy, // serve para ordenação 
    doc, // referencia do que sera deletado banco,tabela,id
    deleteDoc, // deletar
} from 'firebase/firestore'; 

interface LinkProps{
    id: string; 
    name: string; 
    url: string;
    bg: string; 
    color: string
}
export function Admin(){

    const [nameInput, setNameInput] = useState('');
    const [urlInput, setUrlInput] = useState(''); 
    const [textColorInput, setTextColorInput] = useState('#f1f1f1'); 
    const [backgroundColorInput, setBackgroundColorInput] = useState('#121212');
    const [links, setLinks] = useState<LinkProps[]>([]);
    
    useEffect(()=>{
    const linksRef = collection(db, "links"); // acessando a tabela links 
    const queryRef = query(linksRef, orderBy("created", "asc")); // ordenando a tabela link, ordenado pela criação, decrescente

    const unSub = onSnapshot(queryRef, (snapshot)=>{ // snapshot vai retornar os dados do banco 
        let lista = [] as LinkProps[]; 
        snapshot.forEach((doc) => {
            lista.push({
                id: doc.id, 
                name: doc.data().name, 
                url: doc.data().url,
                bg: doc.data().bg, 
                color: doc.data().color   
            })
        })

        setLinks(lista)
    })

        return (() =>{
            unSub(); //quando trocar de pagina, cancela o unSub
        })

    },[])

    async function deletarLink(id:string){
        const docRef = doc(db, "links", id); 
        await deleteDoc(docRef);
    }

    async function registrar(e: FormEvent){
        e.preventDefault(); 
    
        if(nameInput === "" || urlInput === ""){
            alert('Preencha todos os campos'); 
            return; 
        }

        addDoc(collection(db, "links"), {
            name: nameInput, 
            url: urlInput, 
            bg: backgroundColorInput, 
            color: textColorInput, 
            created: new Date() // data de quando o lik foi criado 
        })
        .then(() =>{
            alert('Cadastro realizado com sucesso!');
            setNameInput('');
            setUrlInput('');
        })
        .catch(()=>{
            alert('ERRO AO CADASTRAR O BANCO');
        })

    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl px-4" onSubmit={registrar}>
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Imput 
                placeholder="Digite o nome do link..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Url do Link</label>
                <Imput 
                type="url"
                placeholder="Digite a url..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">

                    <div className="">
                        <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                        <input 
                        type="color" style={{marginLeft: '10px'}}
                        value={backgroundColorInput}
                        onChange={(e) => setBackgroundColorInput(e.target.value)}/>
                    </div>

                    <div className="">
                        <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                        <input 
                        type="color" style={{marginLeft: '10px'}}
                        value={textColorInput}
                        onChange={(e) => setTextColorInput(e.target.value)}/>
                    </div>
                </section>

               {nameInput !== "" && (
                    <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                    <label className="text-white font-medium mt-2 mb-3">Veja como está ficando:</label>
                    <article 
                    className="w-11/12 max-x-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                    style={{marginBottom:8, marginTop: 8, backgroundColor: backgroundColorInput}}
                    >
                        <p style={{color: textColorInput}} className="font-medium">{nameInput}</p>
                    </article>
                </div>
               )}

                <button type="submit" className="bg-blue-600 h-9 rounded-md text-white font-medim gap-4 flex justify-center items-center mb-7 cursor-pointer">
                    Cadastrar
                </button>
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus Links
            </h2>

            {links.map((link) =>(
                <article key={link.id} className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                style={{backgroundColor: link.bg, color: link.color}}>
                    <p>{link.name}</p>
                    <div>
                        <button onClick={() => deletarLink(link.id)} style={{cursor: 'pointer'}}
                        className='border border-dashed p-1 rounded bg-neutral-900'>
                            <FiTrash size={18} color='#fff'/>
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
}