import { Op } from 'sequelize';
import { Usuario, Publicacion, Fotografia, Etiqueta } from '../models/index.js';

export async function buscarPublicaciones(req, res){

    try{

        const titulo = req.query.titulo;
        const autor = req.query.autor;
        const etiqueta = req.query.etiqueta;
        const fechaDesde = req.query.DesdeFecha;
        const fechaHasta = req.query.HastaFecha;


        let filtroPublicacion = {};
        let filtroEtiqueta = {};
        let filtroUsuario = {};
        let etiquetaFlag = false;
        let autorFlag = false;
        let tieneFiltros = false;


        if(titulo){
            filtroPublicacion.tituloPublicacion = { [Op.iLike]: `%${titulo}%`};
        }

        if(fechaDesde && fechaHasta){
            filtroPublicacion.createdAt = { [Op.between]: [new Date(fechaDesde), new Date(fechaHasta)]};
        }

        if(etiqueta){
            filtroEtiqueta.nombreEtiqueta = { [Op.iLike]: `%${etiqueta}%`};
            etiquetaFlag = true;
        }

        if (autor) {
            filtroUsuario.nombreUsuario = { [Op.iLike]: `%${autor}%` };
            autorFlag = true;
        }

        const publicacionesFiltradas = await Publicacion.findAll({
            where: filtroPublicacion,
            include: [
                {model: Fotografia},
                {
                    model: Etiqueta,
                    where: filtroEtiqueta,
                    required: etiquetaFlag
                },
                {
                    model: Usuario,
                    where: filtroUsuario,
                    required: autorFlag
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        for(let publicacion of publicacionesFiltradas){
            if(publicacion.Fotografia && publicacion.Fotografia[0]){
                publicacion.Fotografia[0].urlArchivo = publicacion.Fotografia[0].urlArchivo.toString('base64');
            }
        }
        
        
        if (titulo || autor || etiqueta || fechaDesde || fechaHasta) {
            tieneFiltros = true;
        }

        return res.render('buscar', {
            publicaciones: publicacionesFiltradas,
            valoresFiltrados: req.query,
            tieneFiltros: tieneFiltros
        });


    } catch(error){

        console.error('ERROR FILTRANDO EN LA BUSQUEDA DE IMAGENES: ' + error);
        return res.status(500).send('ERROR DEL SERVIDOR AL FILTRAR IMAGENES ');



    }








}






