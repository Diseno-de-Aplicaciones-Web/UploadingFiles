import Express from 'express'
import { config } from 'dotenv'

if (process.env.NODE_ENV !== "production") config()

const mockedDB = [
    {
        id: 33,
        description: "Fashion chungle dungle",
        pvp: 28.95,
        imageIpfsCid: "bafkreid455xi3qvpsmxk5vqmrs3vkbmu3zxlw4qei3vvrz4oaw7t6b34d4"
    }
]

const app = new Express()
// Manejamos el contenido de la petición sin formato
// como un buffer.
// app.use(Express.text())

app.get("/images/", (req,res)=>{
    res.send(
        mockedDB.map(
            item => `
                <img 
                src="${process.env.IPFS_PROXY+item.imageIpfsCid}" 
                alt="Outra vaca no millo"
                >
            `
        ).join('\n')
    )
})

app.post("/upload-image/",(req, res)=>{
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