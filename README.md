<h1 align="center">SignUp-Backend 💻</h1>

*Es una API de un sistema de SignUp.*

<p></p>

>[!NOTE]
>Este proyecto esta basado en el video de [Nodejs React Mongodb Login y CRUD (Aplicación FullStack)](https://www.youtube.com/watch?v=NmkY4JgS21A&t=4783s) de [Fast Code](https://www.youtube.com/@FaztCode) en el cual agrege validacion de datos, consulta de los datos de usuario, y la opcion de poder editar los datos del usuario.

## Requisitos
Antes de comenzar a utilizar este proyecto, asegúrate de tener instalados los siguientes componentes:
- Node.js (v14 o superior).
- MongoDB (instalado y en ejecución).
- Postman o cualquier otra herramienta para probar las API (opcional).

## Instalación  
1. Clona este repositorio: 
```bash
git clone https://github.com/Manuel-Alonso-AG/SingUp-Backend.git
```
2. Instala las dependencias: 
```bash
npm install
```
3. Configurar variables de entorno: Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:
```bash
SERVER_PORT=4000
MONGOODB_URL=mongodb://localhost/Nombre de tu base de datos
TOKEN_SECRET=secret
```
- SERVER_PORT // Puerto del servidor
- MONGOODB_URL // URL para la conexión de tu base de datos de MongoDB
- TOKEN_SECRET // Palabra secreta para el uso de JWS

## Controladores
Los controladores son responsables de la lógica de negocio de cada ruta. Se encuentra en: src/controllers/auth.controller.js

1. login
- Verifica las credenciales del usuario (correo y contraseña). Si son correctas, genera y envía un token JWT al cliente.
- Solicitud:

```bash
{
  "email": "correo@correo.com",
  "password": "password123"
}
```

2. register
- Registra un nuevo usuario en la base de datos. Si el correo no está registrado, guarda los datos del usuario y genera un token JWT.
- Solicitud:

```bash
{
  "username": "Paco",
  "lastname": "Alonso",
  "phone": "1234567890",
  "email": "correo@correo.com",
  "password": "password123"
}
```

3. logout
- Elimina el token JWT de las cookies del cliente, cerrando la sesión.

4. updateUser
- Permite al usuario actualizar su perfil (nombre, apellido, correo, teléfono, contraseña). Verifica que la contraseña actual sea correcta antes de permitir cambios.
- Solicitud:

```bash
{
  "username": "Paco",
  "lastname": "Alonso",
  "phone": "9876543210",
  "email": "correo@correo.com",
  "currentPassword": "password123", // Necesario para poder realizar la actualizacion de datos
  "newPassword": "newpass456" // Si no se quiere realizar el cambio de contraseña, no agregar esta linea
}
```

5. getUserInfo
- Recupera la información del usuario autenticado utilizando el token JWT.

### Las respues posibles de cada peticion son:
- 200: El proceso fue exitoso.
- 400: Parámetros incorrectos.
- 500: Error interno.

>[!NOTE]
>Todos los controladores, exeptuando a **logout** y a **getUserInfo**, tienen validacion de los datos de las solicitudes. Ademas de validar el Token del usuario en **updateUser** y **getUserInfo**.

## Autenticación (JWT)
El sistema de autenticación utiliza JSON Web Tokens (JWT) para manejar la autenticación. Los tokens se generan al iniciar sesión o registrarse y se almacenan en las cookies del navegador. Cada token tiene un tiempo de expiración de 1 día.

>[!IMPORTANT]
>## Licencia  
>Este proyecto está licenciado bajo la Licencia MIT. [LICENSE](./LICENSE).
