import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.scss'
 
const Register = () => {

    const [userData,setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        password2: '',
    })

    const [register, setRegister] = useState('')
    const [msgError, setMsgError] = useState('')


    let navigate = useNavigate();


    const updateUserData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const Register = async () => {
        
        //Primero, comprobación de campos vacíos

        let data = ['name', 'surname', 'email', 'password', 'password2'];

        for (let field of data) {
            if (userData[field] === '') {
                setMsgError(`Te ha faltado ${[field]} por rellenar`);
                return;
            }
        }
        //Con esto válidamos que el email este correctamente.
        if (!userData.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            setMsgError('introduce un email válido!');
            return;
        }

        // Con este IF, revisamos que la password, esta escrita igual las dos veces.

        if (userData.password !== userData.password2) {
            setMsgError("Los dos password deben de coincidir");
            return;
        }

        //La pasword tiene que ser de un tamaño especificado, en este caso entre 6 y 10 digitos.
        if (userData.password.length < 6 || userData.password.length > 10) {
            setMsgError("La password tiene que ser entre 6 y 10 digitos");
            return;
        }
        //La password requiere un caracter especial.
        if (!userData.password.match(/^(?=.*[*@!#%&()^~{}]).*$/)) {
            setMsgError("falta un caracter especial en la password ejemplo [ *@!#%&()^~{} ]");
            return;
        }

        //enviamos los datos a la base de datos 
        let result = await axios.post("https://mytask2do.herokuapp.com/api/auth/register", userData);
        console.log("Soy result",result)
        //si el registro realizado es correcto, es decir es igual a un 200, nos 
        //redirigira al side Login para que te logees en la web
        if (result.status === 200) {

            setRegister(true);

            setTimeout(() => {
                navigate('/login');

            }, 2000);
        }
    }


    if(register === true){
        return (
            <div className="registerDesign">
                Te has registrado correctamente {userData.name}
            </div>
        )
        
    }else{
        return (
            <div className='registerDesign'>
                <div className="registerContainer">
                    <h2>Register</h2>
                    <input className='inputDesign' type="text" placeholder='Name' name='name' title='name' onChange={updateUserData} />
                    <input className='inputDesign' type="text" placeholder='Surname' name='surname' title='surname' onChange={updateUserData} />
                    <input className='inputDesign' type="email" placeholder='Email' name='email' title='email' onChange={updateUserData} />
                    <input className='inputDesign' type="password" placeholder='Password' name='password' title='password' onChange={updateUserData} />
                    <input className='inputDesign' type="password" placeholder='Repeat-Password' name='password2' title='password2' onChange={updateUserData} />
                    <div className="buttonRegister" onClick={() => Register()}>Register</div>
                    {msgError}
                </div>
            </div>
        )
    }

    
}
export default Register;