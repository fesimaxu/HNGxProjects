import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();





const generateSalt = () => {

    const saltRounds = 10;
   return bcrypt.genSalt(saltRounds);
}

export const hashPassword = async (plainPassword: string) => {
    const salt = await generateSalt()
    return bcrypt.hash(plainPassword,  salt)
}

export const verifyPassword =async (plainPassword:string, hashPassword: any) => {
    return bcrypt.compare(plainPassword, hashPassword);
}


export const generateSignature = async (data: any) => {
    const value = jwt.sign( data , `${process.env.TOKEN_SECRET}`, {
        expiresIn: `${process.env.TOKEN_EXPIRES_IN}m`,
      });

      return value;
}


export const verifySignature= async (signature:string) => {
    return jwt.verify(signature, `${process.env.TOKEN_SECRET}`)
    //return jwt.verify(signature, TOKEN_SECRET!)
}

export const cookieTimeout = () => {
    const expiresIn = new Date(Date.now() + Number(process.env.TOKEN_EXPIRES_IN) * 60 * 1000)
    return expiresIn;
      
}

export const excludeProperty = (obj: any , keysToExclude: any) =>{
    const newObj = { ...obj };
    for (const key of keysToExclude) {
      if (newObj.hasOwnProperty(key)) {
        delete newObj[key];
      }
    }
    return newObj;
}

export  function excludePropertiesFromArray(arr: any, keysToExclude: any) {
    return arr.map((obj: any) => {
      const newObj = { ...obj };
      for (const key of keysToExclude) {
        if (newObj.hasOwnProperty(key)) {
          delete newObj[key];
        }
      }
      return newObj;
    });
  }