import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'


const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req,res)=>{
    res.send('worked')
})
const PORT = 3002

app.listen(PORT, ()=>{
    console.log('Listening on port ', PORT)
})


app.get('/message', (req, res) => {
    res.send ({message: "Hello from Server!!"});   
});

app.post('/message', (req, res) => {
    const product = req.body.name
    fs.promises.writeFile(path.resolve("data.json"), JSON.stringify(req.body, undefined,2))
    .then(() => {
        res.send("product")
    }) 
    console.log(req.body.name)
  });

app.get('/messages', (req, res) => {
    fs.promises.readFile(path.resolve("data.json"), "utf8").then((product) => {
        res.send(product)
    })    
  
})

