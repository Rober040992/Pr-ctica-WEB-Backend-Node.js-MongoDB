import multer from "multer"; // para los multipart/form-data 
import path from "node:path" //para construir rutas

//config para el almacenamiento;
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        const ruta = path.join(import.meta.dirname, '..', 'public','uploads')// esto me da la carpeta actual
        callback(null, ruta)
    }
})

//configuracion de upload
const upload = multer({ storage })

export default upload