import Express from 'express'
// Documentacion multer:
// https://expressjs.com/en/resources/middleware/multer.html
import multer from 'multer' 

const UPLOADS_FOLDER = "./uploads/"
const HOME_FOLDER = "./home/"

const upload = multer({ dest: UPLOADS_FOLDER })

const app = new Express()

app.post('/uploadOnePhoto/',upload.single('photo'),(req, res)=>{
    console.log("File:", req.file)
    console.log("Body:", req.body)
    
    res.sendStatus(201)
})

app.post('/uploadManyPhotos/',upload.array('fotos', 10),(req, res)=>{
    console.log("Files:", req.files.length)
    console.log("Body:", req.body)
    res.sendStatus(201)
})

app.use("/",Express.static(HOME_FOLDER, {index: "index.html"}))

app.use("/public/",Express.static(UPLOADS_FOLDER))

app.listen(3000, ()=>console.log("Ready..."))