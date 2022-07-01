import React, { useState } from "react";
const Validation = (callback) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const regForName = /^[a-zA-Z ]{2,100}$/;
    const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const regForPassword = RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s).{8,25}$/
    );

    const validate = (event, name, value) => {
        switch (name) {
            case "name":
                errors.name = regForName.test(value)
                    ? ""
                    : "Name must have atleast 2 characters";
                break;
            case "email":
                errors.email = regForEmail.test(value)
                    ? ""
                    : "Enter Valid Email";
                break;
            case "password":
                errors.password = regForPassword.test(value)
                    ? ""
                    : "Password must be between 8-25 characters and should contain atleast one lowercase letter, one uppercase letter and one special character";
                break;
            case "cpassword":
                errors.cpassword =
                    document.getElementById("password").value === value
                        ? ""
                        : "Password and confirm password should be same";
                break;
            default:
                alert("Fill proper details");
        }
    };

    const validating_error = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (values) => values.length > 0 && (valid = false)
        );
        return valid;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validating_error(errors)) {
            callback();
        } else {
            alert("There is an error");
        }
    };

    const handler = (event) => {
        event.persist();

        let name = event.target.name;
        let val = event.target.value;
        validate(event, name, val);
        setValues({
            ...values,
            [name]: val,
        });
    };

    return {
        values,
        errors,
        handler,
        handleSubmit,
    };
};

export default Validation;
