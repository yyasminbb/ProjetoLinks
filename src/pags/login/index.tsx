
import {Link, useNavigate} from 'react-router-dom'; 
import {Imput} from '../../components/Imput';
import {useState, type FormEvent} from 'react'; 

// import conexão para login 
import {auth} from '../../services/firebaseConnection';

// import metodo para login
import {signInWithEmailAndPassword} from 'firebase/auth'

export function Login(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    

    function formEnviar(e: FormEvent){
        e.preventDefault();

        if(email === '' || senha === ''){
            alert('Preencha todos os campos!');
            return; 
        }

        signInWithEmailAndPassword(auth, email, senha)
        .then(() =>{
            navigate('/admin', {replace: true});  // replace true faz com que a nagação substitua a pagina atual no historico
        })
        .catch(() =>{
            alert('ERRO: USUARIO OU SENHA INVALIDA'); 
        })

    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            
            <Link to='/'>
                <h1 className='mt-11  text-white mb-7 font-bold text-5xl'>Dev 
                <span className='bg-linear-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent'>Link</span>
                </h1>
            </Link>

            <form className='w-full max-w-xl flex flex-col px-8' onSubmit={formEnviar}>
                
                <Imput 
                placeholder='Digite o seu email...' 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

                <Imput 
                placeholder='**********' 
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}/>

                <button className='h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white cursor-pointer' type='submit'>
                    Acessar
                </button>
            </form>
        </div>
    )
}