import { Usuario } from "../models/index.js";

export async function authMiddleware(req, res, next) {
    const user = req.session.user; // usuario de la sesion solo contiene id
    if (!user) {
        res.redirect('/auth/login');
        return;
    }

    const userId = Number(user.id);

    try {
        const usuarioLogeado = await Usuario.findByPk(userId, {
            attributes: ['idUsuario', 'nombreUsuario', 'apellidoUsuario', 'isValidador'],
        });

        if (!usuarioLogeado) {
            res.redirect('/auth/login');
            return;
        }

        res.locals.currentUser = {
            id: user.id,
            firstName: usuarioLogeado.nombreUsuario,
            lastName: usuarioLogeado.apellidoUsuario,
            isValidador: usuarioLogeado.isValidador
        };
    } catch (error) {
        console.error('[!] Error al autenticar usuario:', error);
    }

    next();
}