const form = document.querySelector("form")

function submitFormHandler (event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    fetch(
        'http://localhost:3000/form/',
        {
            method: "POST",
            body: formData
        }
    )
}

form.addEventListener("submit", submitFormHandler)