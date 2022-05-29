import express from 'express'
import aws from 'aws-sdk'
import {config } from 'dotenv'

import s3UploaderFactory from './s3UploaderFactory.mjs'
import busBoyFactory from './busBoyFactory.mjs'

const HOME_FOLDER = "./home/"

if (process.env.NODE_ENV !== "production") config()

const app = new express()

const s3client = new aws.S3({
    apiVersion: process.env.S3_API_VERSION,
    endpoint: process.env.S3_ENDPOINT,
    signatureVersion: process.env.S3_SIGNATURE_VERSION,
})
const s3Uploader = s3UploaderFactory(s3client,process.env.S3_BUCKET)

const busBoyParser = busBoyFactory(s3Uploader)

app.use("/",express.static(HOME_FOLDER, {index: "index.html"}))

app.post('/form/', busBoyParser, (req, res)=>{
    console.log(" - Body:", req.body);
    console.log(" - Meta:", req.meta)
    res.sendStatus(201)
})

app.listen(3000, ()=>console.log("Ready..."))