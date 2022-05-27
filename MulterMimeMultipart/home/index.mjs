const formSingleFile = document.querySelector("form#singlePhoto")
const formMultipleFiles = document.querySelector("form#multiplePhotos")

function submitOneFileFormHandler (event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    fetch(
        'http://localhost:3000/uploadOnePhoto/',
        {
            method: "POST",
            body: formData
        }
    )
}

function submitManyFilesFormHandler (event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    fetch(
        'http://localhost:3000/uploadManyPhotos/',
        {
            method: "POST",
            body: formData
        }
    )
}

formSingleFile.addEventListener("submit", submitOneFileFormHandler)
formMultipleFiles.addEventListener("submit", submitManyFilesFormHandler)