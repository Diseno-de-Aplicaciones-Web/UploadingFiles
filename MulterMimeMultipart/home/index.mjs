const form = document.querySelector("form#singlePhoto")

function submitFormHandler (event) {
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

form.addEventListener("submit", submitFormHandler)