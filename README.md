# Fotaza - Aplicacion de Fotografias

 Este proyecto es una aplicación web dinámica diseñada para almacenar, ordenar, buscar, vender y compartir fotografías en línea a través de Internet. 

El objetivo principal es propiciar la creación de una comunidad activa de usuarios que puedan compartir imágenes de su propia autoría, rigiéndose por normas de comportamiento y condiciones de uso que favorecen la buena gestión de los contenidos.

 **Link del Deploy en Producción:** [Visitar Fotaza en Render](https://trabajo-integrador-web2-fotaza.onrender.com/)

---

## Rutas y Endpoints Principales



| Ruta Base | Descripción y Funcionalidad |
| :--- | :--- |
| **`/`** | **Home:** Pantalla principal donde se ven las fotos de la comunidad. |
| **`/buscar`** | **Buscador:** Seccion para buscar y filtrar las publicaciones/imagenes. |
| **`/perfil`** | **Perfiles:** Muestra los datos del usuario y maneja los seguidores. |
| **`/publicaciones`** | **Publicaciones:** Permite subir, ver, editar, borrar publicaciones y poner comentarios o valoraciones de fotografias. |
| **`/auth`** | **Autenticacion:** Maneja el registro y login de usuarios. |

---

## Usuario de Prueba 

Para probar el funcionamiento del sistema se ofrece el siguiente usuario

* **👤 Usuario:** `kiryu`
* **🔑 Contraseña:** `12345`
* **🛡️ Rol:** Usuario con permisos normales


---

##  Tecnologías Utilizadas


* **express (v5.2.1):** Es el motor o framework que nos permite levantar el servidor web y manejar de forma fácil todas las rutas de la aplicación.
* **sequelize (v6.37.8):** Un ORM (mapeador) que actúa como puente entre nuestro código JavaScript y la base de datos, permitiéndonos consultar tablas sin escribir SQL puro.
* **pg (v8.20.0) & pg-hstore:** El driver o conector oficial que hace posible que nuestra aplicación de Node se comunique y hable directamente con PostgreSQL.
* **pug (v3.0.4):** Motor de plantillas que toma los datos del backend y los transforma de forma dinámica en las pantallas HTML que ve el usuario.
* **bcrypt (v6.0.0):** Herramienta de seguridad que se encarga de encriptar (hashear) las contraseñas de los usuarios para que se guarden seguras en la base de datos.
* **express-session (v1.19.0):** Middleware que permite al servidor recordar al usuario que inició sesión mientras navega por las distintas páginas de la web.
* **sharp (v0.34.5):** Una libreria de manipulacion de imagenes que usamos en el servidor para estamparle la marca de agua a las fotografias por encima.
* **dotenv (v17.4.2):** Nos permite configurar y leer variables de entorno (como contraseñas o puertos) guardadas de forma secreta fuera del código fuente.

---

## Como instalar el proyecto (version para regularizar, localizado en una branch)

Seguí estos simples pasos para clonar el proyecto y configurarlo en tu computadora:

### 1️⃣ Clonar el Repositorio
Abrí una terminal en tu computadora y descarga la rama de producción ejecutando:

```bash
git clone -b "produccion(regularizar)" https://github.com/AleS485/Trabajo-Integrador-WEB2-Fotaza.git
``` 
### 2️⃣ Instalar las dependencias
Ingresa a la carpeta del proyecto e instala todos los paquetes necesarios de Node corriendo:

```bash
npm install
```

### 3️⃣ Configurar el entorno
Crea un archivo llamado exactamente .env en la raiz del proyecto y configura tus credenciales locales basandote en el orden de este ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario_postgres
DB_NAME=tu_base_de_datos
DB_PASSWORD=tu_contraseña_local
DB_PORT=5432
SESSION_KEY=clave_secreta_para_las_cookies
```

### 4️⃣ Poblar la base de datos (Opcional)
Ejecuta este comando si queres agregar datos de prueba en la base de datos para ver el funcionamiento del sistema.

```bash
npm run seed
```

### 5️⃣ Iniciar el servidor
Una vez que hayas realizado todos los pasos anteriores, para levantar la aplicacion, simplemente ejecuta este comando y busca localhost:3000 en tu navegador:

```bash
npm start
```

---

##  Problemas Encontrados y Solucion

Durante el desarrollo de esta version del proyecto el principal problema con el que me encontre fue la colocacion de una marca de agua en las imagenes a la hora de crear una publicacion, probe usar jimp para lograr esta funcionalidad, pero luego de bastante tiempo consultando la documentacion y que esta no me ayudara a procesar el texto de mi marca de agua, opte por utilizar sharp la cual no me dio casi nada de problemas y me ofrecio lo que buscaba.




