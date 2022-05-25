import Express from 'express'
import { config } from 'dotenv'
import aws from 'aws-sdk'

if (process.env.NODE_ENV !== "production") config()

const s3 = new aws.S3({
    apiVersion: process.env.S3_API_VERSION,
    endpoint: process.env.S3_ENDPOINT,
    signatureVersion: process.env.S3_SIGNATURE_VERSION,
})

class Article {
    constructor({description, pvp}) {
        this.id = Date.now().toString()
        this.description = description
        this.pvp = pvp
    }
    imagePublicURL = null
    imageKey = null
}

const mockedDB = [
    {
        imagePublicURL: "https://public-images.s3.filebase.com/1653471032188",
        imageKey: "1653408470042",
        id: 1653414926644,
        description: "Fashion chungle dungle",
        pvp: 28.95
    }
]

const app = new Express()

app.get("/images/", (req,res)=>{
    res.send(
        mockedDB.map(
            item => `
                <img 
                src="${item.imagePublicURL}" 
                alt="Outra vaca no millo"
                >
            `
        ).join('\n')
    )
})

app.post("/articles/",Express.json(),(req, res)=>{
    const article = new Article(req.body)
    res.json(article)
    mockedDB.push(article)
})

app.get("/articles/",(req, res)=>{
    res.json(mockedDB)
})

app.post("/upload/:articleId", async (req, res)=>{
    try {

        const s3ObjectKey = Date.now().toString()

        const s3Response = s3.upload({ //s3.putObject()
            Bucket: process.env.S3_BUCKET,
            Key: s3ObjectKey,
            Body: req,
            ContentType: req.headers['content-type'],
            ContentLength: req.headers['content-length']
        })

        const data = await s3Response.promise()

        const articleIdx = mockedDB.findIndex(
            item => item.id === req.params.articleId
        )

        mockedDB[articleIdx].imageKey = data.Key
        mockedDB[articleIdx].imagePublicURL = data.Location

        res.sendStatus(201)
        
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }

})

app.listen(process.env.PORT, ()=>console.log("Ready..."))