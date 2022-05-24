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
        this.id = Date.now()
        this.description = description
        this.pvp = pvp
    }
    imageIpfsCid = null
    imageKey = null
}

const mockedDB = [
    {
        imageIpfsCid: "bafkreid455xi3qvpsmxk5vqmrs3vkbmu3zxlw4qei3vvrz4oaw7t6b34d4",
        imageKey: "1653408470042",
        id: 1653414926644,
        description: "Fashion chungle dungle",
        pvp: 28.95
    }
]

const app = new Express()
//app.use(Express.raw())

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
        const key = Date.now().toString()
        let bytesCounter = 0
        console.log(`Uploading file ${key} - ${req.headers['content-type']} ...`)
        req.on("data",chunk=>console.log(`${bytesCounter+=chunk.length} bytes...`))
        req.on("end",()=>console.log(`Done: ${bytesCounter} bytes.`))

        const data = await s3.upload({
            Body: req,
            Key: key,
            ContentType: req.headers['content-type'],
            Bucket: process.env.S3_BUCKET
        }).promise()

        const headers = await s3.headObject({
            Key: key,
            Bucket: process.env.S3_BUCKET
        }).promise()

        const articleIdx = mockedDB.findIndex(
            item => item.id.toString() === req.params.articleId
        )
        mockedDB[articleIdx].imageKey = data.Key
        mockedDB[articleIdx].imageIpfsCid = headers.Metadata.cid
        res.json({data, headers})
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }

})

app.listen(3000)