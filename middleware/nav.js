import { Usuario } from "../models/index.js";

export async function navMiddleware(req, res, next){
    if(req.session && req.session.user){
        res.locals.currentUser = {
            id: req.session.user.id,
            rol: req.session.user.rol
        }
    } else{
        res.locals.currentUser = null;
    }
    next();

};




