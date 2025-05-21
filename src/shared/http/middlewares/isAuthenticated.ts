import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { decode } from "punycode";

interface ITokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void{
    const authHeader = request.headers.authorization;
    if(!authHeader){
        throw new AppError('JWT Token ins missing');
    }
    const [type, token] = authHeader.split(' ');
    try{
        const decodeToken = verify(token, auth.jwt.secret);
        const {sub} = decodeToken as ITokenPayload;
        request.user = {id : sub};
        return next();
    }catch{
        throw new AppError('Invalid JWT Token');
    }
}