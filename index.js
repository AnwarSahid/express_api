const express = require('express')
const bodyParser = require('body-parser')
const db = require('./connection')
const app = express()
const port = 3000


app.use(bodyParser.json())
app.get('/', (req, res) => {
    db.query(`SELECT * FROM users`, (err, respone) => {
        res.send(respone)
        console.log(res);
    })
})

app.get('/user/:id', (req, res) => {
    res.send(`id user: ${req.params.id}`)
})


app.post('/login', (req, res) => {
    console.log({ request: req.body });
    res.send("login successfuly")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})