import fs from 'fs'
import Express from 'express'

const app = new Express()
// Manejamos el contenido de la petición sin formato
// como un buffer.
// app.use(Express.text())


app.use("/images/", Express.static("./uploads/"))

app.post("/upload/",(req, res)=>{
    const imgId = Date.now()
    const file = fs.createWriteStream(`./uploads/${imgId}.jpg`)
    console.log(imgId);
    file.on("close", ()=>{ console.log("Done") })
    req.on("data",(chunk)=>{console.log("*->")})
    req.pipe(file)
    res.sendStatus(200)
    console.log(fs.readdirSync("./uploads/"))
})

app.listen(3000)