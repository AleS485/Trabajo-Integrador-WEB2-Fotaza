import { Router } from "express"
import { obtenerUsuario } from '../controller/usuario.js';
import { contadorSeguidores, contadorSeguidos, obtenerSeguidores, obtenerSeguidos } from '../controller/seguidor.js';

// /perfil

const router = Router()

router.get("/", (req, res) => {

    res.render('perfil');

});


router.get('/:id', async (req, res) => {

    const idUsuario = req.params.id;
    const usuarioBuscado = await obtenerUsuario(idUsuario);

    if(!usuarioBuscado){
        return res.status(404).send('No se encontro ese usuario con el id: ' + idUsuario);
    }

    const seguidores = await contadorSeguidores(idUsuario);
    const seguidos = await contadorSeguidos(idUsuario);
    let fotoUsuario = '';
    if(usuarioBuscado.avatarUsuario){
        fotoUsuario = usuarioBuscado.avatarUsuario.toString('base64');
    }


    res.render('perfil', {
        usuario: usuarioBuscado,
        fotoUsuario: fotoUsuario,
        seguidores: seguidores,
        seguidos: seguidos
    });


});

router.get('/:id/seguidores', async (req, res) => {

    const idUsuario = req.params.id;
    const seguidoresUsuario = await obtenerSeguidores(idUsuario);

    res.render('seguidores', {
        seguidores: seguidoresUsuario
    });

});

router.get('/:id/seguidos', async (req, res) => {

    const idUsuario = req.params.id;
    const seguidosUsuario = await obtenerSeguidos(idUsuario);

    res.render('seguidos', {
        seguidos: seguidosUsuario
    });

});


export default router;