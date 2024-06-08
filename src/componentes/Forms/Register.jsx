import "./formulario.css";
import React, { useState } from "react";
import axios from "axios";
import { Password } from "../Utils/Password";
import { Email } from "../Utils/Email"; 

export const Register = ({ setIsGuest }) => {
    
    const [name, setName]         = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [allValid, setAllValid] = useState (false);
    const [error, setError]       = useState(false);
    const [success, setSuccess]   = useState(false);
    const [duplicatedError, setDuplicatedError] = useState(false);


    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const handlePasswordChange = (newPassword, valid) => {
        setPassword(newPassword);
        setAllValid(valid);
    }
 
    const handleBackHome = () => {
        setIsGuest(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if(name == "" || password == "" || email == ""){
            setAllValid(false);
        }
        
        //Solo se procede si no existen errores de ningun tipo
        if(!allValid){
            setError(true);
            setDuplicatedError(false);
            return;
        }

        setError(false);

        try {
            const response = await axios.post("http://localhost:8080/users", {
                name: name,
                email: email,
                password: password,
            });

            setSuccess(true);
            setError(false);
            setDuplicatedError(false);

        } catch (error) {
            const status = error.response.request.status;
            if(status == 409){
                setDuplicatedError(true);
            }
        }
    };


    return (
        <>
            <form className="formulario" onSubmit={handleSubmit}>
                <h2>Registrarse</h2>
                <div className="fields">
                    <input  type="text" id="name"  value={name}
                        onChange={handleNameChange}  placeholder="Nombre" />
                    <Email onEmailChange={handleEmailChange}/>
                    <Password onPasswordChange={handlePasswordChange}/>
                </div>

                {error && 
                    <p className="error">Completa los campos correctamente</p>
                }

                {duplicatedError &&
                    <p className="error">Este email ya se encuentra registrado</p>
                }

                {!success && 
                    <button type="submit" className="submit">Enviar</button>
                }

                {success &&
                    <div>
                        <p className="success">Usuario creado correctamente</p>
                        <button onClick={e => handleBackHome(false)} className="change-form">Volver</button>
                    </div>
                }

            </form>
       </>
    );
};
