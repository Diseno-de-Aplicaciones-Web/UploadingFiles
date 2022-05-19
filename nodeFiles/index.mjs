import fs from 'fs'

const readFile = fs.readFileSync("./nodeFiles/datos.txt");
const readPhoto = fs.readFileSync("./nodeFiles/foto.jpg");

console.log(readFile);
console.log(readPhoto);
console.log(readFile.toString());

const writeFile = fs.writeFileSync("./nodeFiles/otrosDatos.txt", readFile)
const writePhoto = fs.writeFileSync("./nodeFiles/otraFoto.jpg", readPhoto)