import "./formulario.css";
import axios from "axios";
import { useState } from "react";
import { Password } from "../Utils/Password";
import { Email } from "../Utils/Email";

export function Login ({ setIsGuest, setUser }){

    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState(false);
    const [notUserError, setNotUserError] = useState(false);


    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    }


    const handleNotUserError = (state) => {
        setNotUserError(state);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        //No se procede si hay campos vacios
        if(password == "" || email == ""){
            setError(true);
            handleNotUserError(false);
            return;
        }

        setError(false);

        try {
            //Si se loggea exitosamente, pasa al Dashboard
            const response = await axios.post("http://localhost:8080/login", {
                email: email,
                password: password,
            });

            const name = response.data.user.name;
            setUser([name])

        } catch (error) {
            //Si falla, muestra mensaje de error
            const status = error.request.status;
            if(status == 401){
                handleNotUserError(true);
            }
        }
    };

    
    const startRegister = () =>{
        setIsGuest(true);
    }

    return (
        <form className="formulario" onSubmit={handleSubmit}>
                <h2>LOGIN</h2>
                <div className="fields">
                    <Email onEmailChange={handleEmailChange}/>    
                    <Password onPasswordChange={handlePasswordChange}/>
                </div>

                {error && 
                    <p className="error">Completa los campos correctamente</p>
                }

                {notUserError &&
                    <p className="error">Credenciales incorrectas</p>
                }

                <button className="submit">Iniciar sesión</button>

                <h5>No tengo una cuenta. 
                    <button onClick={e => startRegister(true)} className="change-form"> 
                        Registrarse
                    </button>
                </h5>
            </form>
    )
}