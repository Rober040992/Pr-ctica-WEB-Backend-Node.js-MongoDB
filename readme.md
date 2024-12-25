![Nodepop Home](ejem.png)
# Nodepop

Nodepop es una aplicación web para la compra y venta de artículos de segunda mano. Permite a los usuarios registrarse, iniciar sesión y gestionar sus productos mediante un sistema de autenticación. Cada usuario puede crear productos con atributos como nombre, precio y etiquetas, y no hay un límite máximo para la cantidad de productos que un usuario puede crear. La aplicación está desarrollada con **Node.js**, **Express**, **MongoDB** y **EJS**.

## Características

- Autenticación de usuarios: Registro, inicio de sesión y cierre de sesión.
- Gestión de productos: Crear, ver y eliminar productos.
- Paginacion manual introduciendo el limit&skip manualmente
- Tags de productos: Cada producto puede tener uno o varios tags (categorías) como `work`, `lifestyle`, `motor` o `mobile`.
- No existe un máximo para la cantidad de productos que un usuario puede crear.

## Requisitos previos

Asegúrate de tener instalados:

- **Node.js** (versión 14 o superior)
- **MongoDB** (en ejecución en `localhost:27017`)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/Rober040992/Pr-ctica-WEB-Backend-Node.js-MongoDB.git
   cd nodepop
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura tu base de datos en MongoDB y asegúrate de que esté ejecutándose en `mongodb://127.0.0.1:27017/nodepop`.

## Scripts

En el archivo `package.json`, se han definido varios scripts para facilitar el uso de la aplicación. A continuación, se explica cada uno:

### `npm start`

Inicia el servidor en modo observación (watch mode), reiniciándose automáticamente cuando se detectan cambios en el código. Esto es útil para desarrollo.

```bash
npm start
```

### `npm run dev`

Inicia el servidor en modo desarrollo en el puerto `4444`. Esto es útil para pruebas de desarrollo con un puerto diferente.

```bash
npm run dev
```

### `npm run debug`

Inicia el servidor en modo depuración en el puerto `5555`. Esto es útil para identificar y resolver problemas en el código.

```bash
npm run debug
```

### `npm run initDataBase`

Este script inicializa la base de datos. Te pedirá confirmación para eliminar los datos actuales y crear datos de ejemplo, incluyendo usuarios y productos iniciales.

```bash
npm run initDataBase
```

#### Pasos para ejecutar `initDataBase`:

1. Ejecuta el comando `npm run initDataBase`.
2. Se te pedirá que confirmes si deseas vaciar la base de datos y crear datos de prueba. Escribe `yes` y presiona **Enter** para continuar.
3. El script eliminará los usuarios y productos existentes y creará nuevos datos de ejemplo.

### `npm run lint`

Ejecuta el linter `standard` para comprobar y corregir automáticamente el estilo de tu código según las reglas de JavaScript Standard Style.

```bash
npm run lint
```

## Uso de la Aplicación

1. **Iniciar el servidor**: Una vez instaladas las dependencias, inicia el servidor ejecutando uno de los scripts mencionados (`start`, `dev` o `debug`).

2. **Registrar un usuario**: Accede a la página de registro para crear una cuenta de usuario.

3. **Iniciar sesión**: Una vez registrado, inicia sesión para acceder a la funcionalidad completa de la aplicación.

4. **Crear productos**: En la página de creación de productos, el usuario autenticado puede agregar productos sin límite de cantidad. Cada producto puede incluir:
   - **Nombre**: Un nombre único para el producto.
   - **Precio**: El precio del producto (en dólares). *No hay un límite máximo para el precio.*
   - **Tags**: Uno o varios tags que describan el producto (`work`, `lifestyle`, `motor`, `mobile`).

5. **Ver y eliminar productos**: Los productos creados por el usuario aparecerán en la página de inicio. Desde allí, el usuario puede ver los detalles de cada producto o eliminarlos.

## Estructura del Proyecto

La estructura de directorios de Nodepop es la siguiente:

- **bin**: Contiene el archivo `www`, que inicia el servidor HTTP.
- **config**: Incluye la configuración de conexión a MongoDB (`mongooseConfig.js`) y el manejo de sesiones (`sessionManager.js`).
- **controllers**: Contiene los controladores de las rutas de la aplicación.
- **models**: Define los esquemas de datos para usuarios y productos en MongoDB.
- **public**: Almacena archivos estáticos, como hojas de estilo CSS.
- **views**: Contiene las plantillas EJS para renderizar las páginas de la aplicación.
- **app.js**: Configura la aplicación de Express y define las rutas principales.
- **initDB.js**: Script para inicializar la base de datos con datos de ejemplo.

## Tecnologías Utilizadas

- **Node.js**: Plataforma de backend utilizada para construir la aplicación.
- **Express**: Framework para manejar las rutas y la lógica del servidor.
- **MongoDB**: Base de datos NoSQL para almacenar los datos de usuarios y productos.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB, utilizado para definir y gestionar esquemas de datos.
- **EJS**: Motor de plantillas para renderizar las vistas en HTML.
- **bcrypt**: Para hashear y comparar las contraseñas de los usuarios de forma segura.
- **express-session**: Para gestionar las sesiones de los usuarios en la aplicación.
- **connect-mongo**: Almacenamiento de sesiones en MongoDB.
- **http-errors**: Para crear errores HTTP personalizados y manejarlos en la aplicación.
- **morgan**: Middleware de registro de solicitudes HTTP, útil para depuración y monitoreo.
- **cross-env**: Para definir variables de entorno en los scripts de npm de manera multiplataforma.
- **standard**: Linter para mantener el estilo y la calidad del código.
- **multer**: multipart/form-data permite el manejo de files

