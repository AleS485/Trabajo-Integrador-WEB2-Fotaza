import { Usuario, Rol, RolUsuario, Coleccion } from "../models/index.js";

export async function loginForm(req, res) {
    res.render('login')
}

export async function login(req, res) {
    try {

        const { nombreUsuario, password } = req.body;

        if (!nombreUsuario || !password) {
            return res.status(400).render('login', {
                alert: { status: "error", text: "COMPLETE TODOS LOS CAMPOS" },
                formValues: req.body
            });
        }

        const nombre = nombreUsuario.trim();
        const pass = password.trim();

        const user = await Usuario.findOne({
            where: { nombreUsuario: nombre},

            include: [{model: Rol, as: 'roles'}]
        })

        if (!user) {
            return res.status(400).render('login', {
                alert: { status: "error", text: "USUARIO O CONTRASENA INCORRECTA" },
                formValues: req.body
            });
        }

        
        const isValidated = await user.validatePassword(pass);

        if (!isValidated) {
            res.status(400).render('login', {
                alert: {
                    status: "error",
                    text: "USUARIO O CONTRASENA INCORRECTA"
                },
                formValues: req.body
            })
            return;
        }

        if(!user.estadoUsuario){
            res.status(400).render('login', {
                alert: {
                    status: "error",
                    text: "TU CUENTA ESTA DADA DE BAJA, NO PODES ENTRAR"
                },
                formValues: req.body
            })
            return;
        }

        req.session.user = {
            id: user.idUsuario,
            rol: user.roles[0].nombreRol
        };

        console.log("prueba sesion: ", req.session.user);

        if(req.session.user.rol == 'Validador'){
            return res.redirect('/denuncias/reportes');
        }

    } catch (error) {
        console.log('[!] Error en login: ', error);
        res.status(500).render('login', {
            alert: {
                status: "error",
                text: "Hubo un error al iniciar sesion"
            },
            formValues: req.body
        })
        return;
    }

    // si esta todo ok => luego de redirecciona al home
    return res.redirect('/')
}

export async function signupForm(req, res) {
    res.render('registroUsuario');
}

export async function signup(req, res) {
    try {
        const { nombreUsuario, apellidoUsuario, email, passwordUsuario, avatar } = req.body;

        if (!nombreUsuario || !apellidoUsuario || !email || !passwordUsuario || !avatar) {
            return res.status(404).send("CAMPOS SIN LLENAR");
        }

        const name = nombreUsuario.trim();
        const lastname = apellidoUsuario.trim();
        const mail = email.trim();
        const pass = passwordUsuario.trim();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(mail)) {
            return res.status(400).send("EL FORMATO DEL EMAIL NO ES VALIDO");
        }

        const usuarioExiste = await Usuario.findOne({
            where: { nombreUsuario: name}
        })
        if(usuarioExiste){
            return res.status(400).send("ESTE NOMBRE YA EXISTE");
        }

        const emailExistente = await Usuario.findOne({
            where: { email: mail }
        });
        if (emailExistente) {
            return res.status(400).send("ESTE EMAIL YA EXISTE EN OTRA CUENTA");
        }

        if (!avatar.src) {
            return res.status(400).send("NO EXISTE ESTE AVATAR");
        }

        const textBase64 = avatar.src.split(",");
        const codigoBase64 = textBase64[1];
        const imgBuffer = Buffer.from(codigoBase64, 'base64');

        const usuarioCreado = await Usuario.create({
            nombreUsuario: name,
            apellidoUsuario: lastname,
            email: mail,
            passwordUsuario: pass,
            avatarUsuario: imgBuffer,
            estadoUsuario: true
        });

        await RolUsuario.create({
            idUsuario: usuarioCreado.idUsuario,
            idRol: 1
        })

        await Coleccion.create({
            nombreColeccion: "Favoritos",
            idUsuario: usuarioCreado.idUsuario
        })

        return res.status(201).send("SE CREO EL USUARIO");

    } catch (error) {

        console.log("[!] ERROR AL CREAR USUARIO ", error);
        return res.status(500).send("ERROR DEL SERVIDOR EN LA CREACION DEL USUARIO");

    }

}

export async function logout(req, res) {
    if (req.session) {
        await req.session.destroy();
        res.redirect('/');
        return;
    }
}