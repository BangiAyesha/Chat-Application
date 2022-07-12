const Joi = require("joi");

const email = Joi.string().email().required();
const name = Joi.string()
    .regex(/^[a-zA-Z ]{2,100}$/)
    .min(2)
    .required()
    .label("Name should be only text and minimum 2 letters");
const password = Joi.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s).{8,25}$/)
    .required()
    .label(
        "Password must be 8-25 characters and must include special character and number"
    );
const cpassword = Joi.valid(Joi.ref("password"))
    .required()
    .label("Confirm Password should be same as password");

const signUp = Joi.object()
    .keys({
        name,
        email,
        password,
        cpassword,
    })
    .options({ allowUnknown: true });

const signIn = Joi.object().keys({
    email,
    password,
});

module.exports = { signIn, signUp };
