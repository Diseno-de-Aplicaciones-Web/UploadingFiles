/**
 * Returns a S3 uploader pointing to bucket.
 * @param {aws.S3} s3client 
 * @param {string} bucketName 
 * @returns function(file: buffer|readableStream, mimeType: string)
 */
function s3UploaderFactory (s3client, bucketName) {
    return function (name, file, mimeType) {
        const s3Response = s3client.upload({
            Bucket: bucketName,
            Key: Date.now().toString(),
            Body: file,
            ContentType: mimeType
        })
        return {
            file: name,
            promise: s3Response.promise()
        }
    }
}



export default s3UploaderFactory