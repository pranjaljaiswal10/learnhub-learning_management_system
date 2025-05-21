import {body} from "express-validator"

const userLoginValidator=()=>{
    return [
        body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Email is invalid"),
        body("password").trim().notEmpty().withMessage("Password is required").isStrongPassword()
    ]
}


export {userLoginValidator}