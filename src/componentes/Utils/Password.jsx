import React, { useState } from "react";
import PropTypes from 'prop-types';


export const Password = ({ onPasswordChange }) => {

    const [password, setPassword] = useState("");
    const [emptyPassWord, setEmptyPassword] = useState(true);
    const [passwordValidation, setPasswordValidation] = useState(false);

    
    const handlePasswordChange = (event) => {
        if (!event?.target) {
            return;
        }

        const newPassword = event.target.value;
        newPassword != "" ? setEmptyPassword(false) : setEmptyPassword(true);
        setPassword(newPassword);
        
        const re = /^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$/;
        const valid =  re.test(newPassword);
        setPasswordValidation(valid);
        onPasswordChange(newPassword, valid);
    }

    return (
        <div>
            <input  type="password" id="password" value={password}
                onChange={handlePasswordChange} placeholder="Password" />

            {(!passwordValidation && !emptyPassWord) && 
                <h6>La contraseña debe contener al menos<br /> un número y minimo 6 caracteres</h6>
            }
        </div>
    );
}

Password.propTypes = {
    onPasswordChange: PropTypes.func.isRequired,
};