import { Router } from "express"
import { obtenerUsuario } from '../controller/usuario.js';
import { contadorSeguidores, contadorSeguidos, obtenerSeguidores, obtenerSeguidos, dejarSeguirUsuario, verificarSiLoSigue, seguirUsuario } from '../controller/seguidor.js';


// /perfil

const router = Router()

router.get("/", (req, res) => {

    res.redirect(`/perfil/${req.session.user.id}`);

});


router.get('/:id', async (req, res) => {

    const idUsuario = req.params.id;
    const usuarioBuscado = await obtenerUsuario(idUsuario);

    if(!usuarioBuscado){
        return res.status(404).send('NO SE ENCONTRO EL USUARIO CON ESE ID: ' + idUsuario);
    }

    const seguidores = await contadorSeguidores(idUsuario);
    const seguidos = await contadorSeguidos(idUsuario);
    let fotoUsuario = '';
    if(usuarioBuscado.avatarUsuario){
        fotoUsuario = usuarioBuscado.avatarUsuario.toString('base64');
    }

    let usuarioLoSigue = false;
    if(req.session.user && req.session.user.id != parseInt(idUsuario)){
        usuarioLoSigue = await verificarSiLoSigue(req.session.user.id, idUsuario);
    }


    res.render('perfil', {
        usuario: usuarioBuscado,
        fotoUsuario: fotoUsuario,
        seguidores: seguidores,
        seguidos: seguidos,
        usuarioLoSigue: usuarioLoSigue
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


router.post('/:id/seguir', seguirUsuario);
    
router.post('/:id/dejarSeguir', dejarSeguirUsuario);








export default router;