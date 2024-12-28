//fichero de configracion para la internazionalizacion 
import { I18n } from "i18n";
import path from 'node:path' 


const i18n = new I18n({
    locales: ['en', 'es'],
    directory: path.join(import.meta.dirname, '..','locales'), //donde lo guardamos
    defaultLocale: 'en',
    autoReload: true, // actualiza los cambios en los JSON, si los hay en la carpeta locales
    syncFiles: true, // sincroniza todos los files
  });

export default i18n
