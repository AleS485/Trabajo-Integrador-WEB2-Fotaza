import { Coleccion, ColeccionPublicacion, Fotografia, Publicacion } from "../models/index.js";


export async function mostrarColecciones(req, res){

    try{
        const coleccionesBuscadas = await Coleccion.findAll({
            where: {idUsuario: req.session.user.id}
        });

        res.render('colecciones_mostrar', {
            colecciones: coleccionesBuscadas
        })

    } catch(error){
        console.log("[!] ERROR BUSCANDO LAS COLECCIONES: " + error);
        res.status(500).send("ERROR AL BUSCAR LAS COLECCIONES PARA MOSTRAR");
    }




}

export async function cargarPublicacionesColeccion(req, res){

    try{
        const {idSeleccionada} = req.params;

        const coleccionSeleccionada = await Coleccion.findOne({
            where: {idColeccion: idSeleccionada},
            include: [{
                model: Publicacion,
                include: [Fotografia]
            }
            ]
        });

        if(!coleccionSeleccionada){
            return res.status(404).send("NO SE ENCONTRO ESA COLECCION");
        }

        const publicacionesSinProcesar = coleccionSeleccionada.Publicacions || []; 
        const publicacionesProcesadas = [];
        
        for(let publicacion of publicacionesSinProcesar){
            const fotos = publicacion.Fotografia;
            let fotoBase64= "";

            if(fotos.length > 0 && fotos[0].urlArchivo){
                fotoBase64 = fotos[0].urlArchivo.toString('base64');
            }
            publicacionesProcesadas.push({
                idPublicacion: publicacion.idPublicacion,
                fotoPortada: fotoBase64
            })
        }





        res.render('coleccionSeleccionada', {nombreColeccion: coleccionSeleccionada.nombreColeccion,
            publicaciones: publicacionesProcesadas
        });


    } catch(error){
        console.log("[!] ERROR CARGANDO PUBLICACIONES DE LA COLECCION: " + error);
        res.status(500).send("ERROR DEL SERVIDOR CARGANDO PUBLICACIONES DE COLECCION");
    }



}



export async function crearColeccion(req, res){

    try{

        const nombreColeccion = req.body.nombreColeccion;

        if (!nombreColeccion) {
            return res.status(400).render('crear_coleccion', {
                alert: { 
                    status: "error", 
                    text: "TENES QUE PONER UN NOMBRE" 
                }
            });
        }



        await Coleccion.create({
            nombreColeccion: nombreColeccion,
            idUsuario: req.session.user.id
        })

        return res.status(201).render('crear_coleccion', {
            alert: { 
                status: "success", 
                text: "COLECCION CREADA CORRECTAMENTE" 
            }
        });
        
    


    } catch(error){

        console.log("[!] No se pudo crear la coleccion: " + error)
        return res.status(500).render('crear_coleccion', {
            alert: { 
                status: "error", 
                text: "HUBO UN ERROR CREANDO LA COLECCION" 
            }
        });

    }


}

export async function cargadoVistaColeccion(req, res){
    try{
        const { idPublicacion } = req.params;
        const coleccionesBuscadas = await Coleccion.findAll({
            where: {idUsuario: req.session.user.id}
        })

        res.render('guardarColeccion', {
            idPublicacion, 
            colecciones: coleccionesBuscadas 
        })


    } catch(error){

        console.log("[!] error cargando vista de guardar coleccion: " + error);
        res.status(500).send("ERROR DEL SERVIDOR CARGANDO VISTA GUARDAR COLECCION");

    }
}


export async function guardarEnColeccion(req, res){
    const {idColeccion, idPublicacion} = req.body;

    try{
        const coleccionesBuscadas = await Coleccion.findAll({
            where:{idUsuario: req.session.user.id}
        });

        const [coleccion, creada] = await ColeccionPublicacion.findOrCreate({
            where:{idColeccion: idColeccion
                ,idPublicacion: idPublicacion}
        })

        let estadoAlert = {}; // alerta profe varia
        let statusCodeCreada;
        if(creada){
            statusCodeCreada = 201;
            estadoAlert = {
                status: "success",
                text: "SE GUARDO LA PUBLICACION EN LA COLECCION"
            };
        } else{
            statusCodeCreada =400;
            estadoAlert = {
                status: "error",
                text: "YA GUARDASTE ESTA PUBLICACION ANTES"
            };
        }

        return res.status(statusCodeCreada).render("guardarColeccion", {
            idPublicacion,
            colecciones: coleccionesBuscadas,
            alert: estadoAlert
        })
    } catch(error){
        console.log("[!] ERROR GUARDANDO LA COLECCION: " + error);
        return res.status(500).send("ERROR GUARDANDO PUBLICACION EN LA COLECCION");
    }






}










