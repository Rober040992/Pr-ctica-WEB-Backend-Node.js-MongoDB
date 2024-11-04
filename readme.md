# Custom template coming from

[`npx express-generator . --view=ejs`](https://www.npmjs.com/package/express-generator)

- **Updated (27/10/2024) all the dependencies to fix the vulnerabilities**

- **Added the flag `--watch` to the "start" script**

- **Added "debug" and "dev" scripts**

- **Added `cross-env` library to be able to run the scripts in every OS**

- **Added `standard` library to lint and format the code**

- **Migrated from "CommonJS Modules" to "ECMASCRIPT Modules"**

- **Customized a bit the initial log when run the app**

## my changes and progression;

- **cross-env installed**
- use npm run dev; Ejecuta la aplicación en el puerto 4444 sin mensajes de depuración adicionales.
- use npm debug;  Ejecuta la aplicación en el puerto 5555 con mensajes de depuración activados.

- npm i mongoose
- config creado e importado en app con su await correspondiente
- crear base de datos y conectarla
- probara a crear un producto 
- crear models product con el modelo de schema
- crear initDB para inicializar un producto en nuestra DB atraves de script "npm run initDataBase"
-