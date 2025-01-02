export function changeLocale(req, res, next){
    const locale = req.params.locale
    // ponemos una cockie en la respuesta
    res.cookie('nodeapp-locale', locale, {
            maxAge: 1000 * 60 * 60
        })//1 hora // (nombre de la cookie, el idioma y maxAge es el tiempo que va a durar esa cookie)
    
    //redirigir a la misma pagina en la que estaba
    res.redirect('back') 
}