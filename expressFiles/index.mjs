import fs from 'fs'
import Express from 'express'

const app = new Express()
app.use(Express.text())

app.post("/",(req, res)=>{
    const file = fs.writeFileSync("./expressFiles/salida.txt", req.body)
    res.sendStatus(200)
})

app.listen(3000)