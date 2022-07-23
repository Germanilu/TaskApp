import React, { useEffect, useState } from 'react';
import './Login.scss'
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logingUser, loginUser, userData } from '../userSlice';
 const Login = () => {

    //Hooks

    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [msgError, setMsgError] = useState()


    let navigate = useNavigate();
    const dispatch = useDispatch();
    const credenciales = useSelector(userData);

    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


    useEffect(() => {

    },[])

    useEffect(() => {
        if(credenciales?.token !== ""){
            navigate('/group')
        }
    })

    const login = () => {
        //Compruebo con una expresion regular si el email tiene arroba y si esta escrito en formato email
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email)) {
            //Si no lo esta llamo modifico MsgError con un string y retorno el error
            setMsgError('Introduce un e-mail válido');
            return;
        }

        //Compruebo si el password tiene mas de 4 caracteres con una expresion regular si no los tiene ejecuto el error de la linea 73
        if (credentials.password.length > 4) {
            if (! /[\d()+-]/g.test(credentials.password)) {
                //Este error no se ejecuta porque el error de backend lo sobrescribe. 
                setMsgError("Introduce un password valido");
                return;
            }
        } else {
            //Si el password es inferior a 5 caracteres se modifica MsgError con este string
            setMsgError("Password minimo de 5 caracteres")
            return
        }

        //Si tengo algo referenciado como error, lo limpio
        setMsgError("")

        //Utilizo dispatch, el metodo de redux para ejecutar el reducer
        dispatch(loginUser({ email: credentials.email, password: credentials.password }))
    }



     return (
         <div className='loginDesign'>
            <div className="containerLogin">
                <input className='inputLogin' type="email" name='email' title='email' placeholder='Email...' onChange={updateCredentials} />
                <input className='inputLogin'type="password" name='password' title='password' placeholder='Password...' onChange={updateCredentials} />
                <div className="buttonLogin" onClick={() => login()}>Login</div>
            </div>
         </div>
     )
}
export default Login;