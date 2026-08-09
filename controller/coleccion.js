import { Coleccion } from "../models/index.js";

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










