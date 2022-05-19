import fs from 'fs'
import Express from 'express'

const app = new Express()
// Manejamos el contenido de la petición sin formato
// como un buffer.
// app.use(Express.text())

app.post("/",(req, res)=>{
    const file = fs.createWriteStream("./expressFilesStream/salida.txt")
    file.on("close", ()=>{ console.log("Done") })
    req.pipe(file)
    res.sendStatus(200)
})

app.listen(3000)