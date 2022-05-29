import busboy from 'busboy' 
// Documentacion busboy:
// https://www.npmjs.com/package/busboy

/**
 * Provides a Express middleware for managing mime-multipart requests.
 * - File fields are streamed to fileHandler.
 * - String fields are appended to req.body.
 * - Metadata about fields and files are appended to req.bodyMeta
 * @param fileHandler: function( file: readableStream, mimeType: string)  
 * @returns function(req: Express.Request, res: Express.Response, next: Express.Middleware)
 */
function busBoyFactory(fileHandler) {
    return function (req, res, next) {
        console.log("New request...");
        const body = {}
        const meta = {
            files: [],
            fields: {},
        }
        const runningFileHandlers = []
        const parser = busboy({headers: req.headers})
        parser.on("file", (name, file, info)=>{
            console.log("- File:", info.filename)
            runningFileHandlers.push(fileHandler(info.filename, file, info.mimeType))
        })
        parser.on("field",(name, value, info)=>{
                console.log("- Field:", name, value)
                body[name] = value
                meta.fields[name] = info
        })
        parser.on("close", async ()=>{
            runningFileHandlers.forEach( async item => {
                meta.files.push({ file: item.file, data: await item.promise })
            })
            await Promise.all(runningFileHandlers.map(item => item.promise))
            req.body = body
            req.meta = meta
            next()
            console.log("End request !!!");
        })
        req.pipe(parser)
    }
}

export default busBoyFactory