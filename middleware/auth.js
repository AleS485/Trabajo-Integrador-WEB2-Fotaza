import { Rol, Usuario } from "../models/index.js";

export async function authMiddleware(req, res, next) {
    const user = req.session.user; // usuario de la sesion solo contiene id
    if (!user) {
        res.redirect('/auth/login');
        return;
    }

    const userId = Number(user.id);

    try {
        const usuarioLogeado = await Usuario.findByPk(userId, {
            attributes: ['idUsuario', 'nombreUsuario', 'apellidoUsuario']
        });

        if (!usuarioLogeado) {
            res.redirect('/auth/login');
            return;
        }

        res.locals.currentUser = {
            id: user.id,
            firstName: usuarioLogeado.nombreUsuario,
            lastName: usuarioLogeado.apellidoUsuario,
            rol: user.rol
        };
    } catch (error) {
        console.error('[!] Error al autenticar usuario:', error);
        return res.status(500).send("ERROR DEL SERVIDOR")
    }

    next();
}