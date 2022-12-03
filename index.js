const express = require('express')
const bodyParser = require('body-parser')
const db = require('./connection')
const respone = require('./respone')
const { response } = require('express')
const app = express()
const port = 3000


app.use(bodyParser.json())
app.get('/', (req, res) => {
    db.query(`SELECT * FROM users`, (err, data) => {
        respone(200, data, "get data user", res)
    })
})

app.get('/user/:id', (req, res) => {
    const sql = `SELECT * FROM users WHERE id = ${req.params.id}`
    db.query(sql, (err, data) => {
        if (err) throw err
        respone(200, data, "data successfuly", res)
    })
})


app.post('/user/post', (req, res) => {
    const { name, address, phone } = req.body
    const sql = `INSERT INTO users (name,address,phone) VALUES ('${name}', '${address}', '${phone}')`

    db.query(sql, (err, data) => {
        console.log(data);
    })

    respone(200, "oke", "data successfuly", res)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})