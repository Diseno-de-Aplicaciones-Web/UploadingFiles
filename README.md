# UploadingFiles

## In advance:

* Evitar almacenar contraseñas en la base de datos:
  * Link: https://dev.to/aditya278/understanding-and-implementing-password-hashing-in-nodejs-2m84
  * Nota: con el primer ejemplo que aparece en el artículo tenemos suficiente para hacer un hash para almacenar en lugar de la contraseña.
* Autorización JWT:
    * Link: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
    * Notas: En el ejemplo no se comprueba la identidad del solicitante antes de proporcionar el token (autenticación). Para un uso real, deberán proporcionarnos un usuario y contraseña que contrastaresmos contra la base de datos para comprobar que son correctos antes de emitir el token o un código 401 si la autenticación es incorrecta.
* Gestión de formulation mediante streams:
    * Link: https://www.npmjs.com/package/busboy
    * Notas: El ejemplo del enlace está realizado sin Express, con los recursos propios de Node. La aplicación en Express se realizaría de la misma manera, proporcionando el objeto `request` de Express en lugar del `req` que se ve en el ejemplo: `req.pipe(bb)`.
* Redimensionado de imágenes sobre streams usando `sharp`:
    * Link: https://ollie.relph.me/streaming-image-resizer-with-node-js/
