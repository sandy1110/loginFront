import React, { useState } from "react";
import PropTypes from 'prop-types';


export const Email = ({ onEmailChange }) => {

    const [email, setEmail] = useState("");
    const [emptyEmail, setEmptyEmail] = useState(true);
    const [emailValidation, setEmailValidation] = useState(false);


    const handleEmailChange = (event) => {
        if (!event?.target) {
            return;
        }

        const newEmail = event.target.value;
        newEmail != "" ? setEmptyEmail(false) : setEmptyEmail(true);
        setEmail(newEmail);
        onEmailChange(newEmail);

        const re = /.+@.+\.[A-Za-z]+$/;
        const valid =  re.test(newEmail);
        setEmailValidation(valid);
    }

    
    return (
        <div>
            <input type="text" id="email" value={email}
                onChange={handleEmailChange} placeholder="Email" />

            {(!emailValidation && !emptyEmail) && 
                <h6>Email inválido</h6>
            }
        </div>
    );
}

Email.propTypes = {
    onEmailChange: PropTypes.func.isRequired,
};