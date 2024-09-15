
//validates the body of the requests
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


//validates the body of the sign up request
const signUpBodyValidation = (body) => {
    const schema = Joi.object({
        userName: Joi.string().required().label("User Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        isCustomer: Joi.boolean().required().label("isCustomer"),
        isSeller: Joi.boolean().required().label("isSeller"),
        isAdmin: Joi.boolean().required().label("isAdmin"),
        
    });

    //takes the body of object and validates it with schema.validate method
    return schema.validate(body);
};

const loginBodyValidation = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(body);
};

const refreshTokenBodyValidation = (body)=>{
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh Token"),
    });
    return schema.validate(body);
};

export { signUpBodyValidation, loginBodyValidation, refreshTokenBodyValidation };