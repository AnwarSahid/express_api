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
        if (err) respone(500, "invalid", "name already taken", res)
        if (data?.affectedRows) respone(200, "Succes", "data Succesfuly added", res);
    })
})


app.put('/user/put', (req, res) => {

    const { id, name, address, phone } = req.body
    const sql = `UPDATE users SET name = '${name}', address ='${address}', phone= '${phone}' WHERE id=${id}`

    db.query(sql, (err, data) => {
        if (err) respone(500, "invalid", "data is invalid", res)
        if (data?.affectedRows) {
            const format = {
                isSucces: data.affectedRows,
                message: data.message,
            }
            respone(200, format, "successfuly", res)
        } else {
            respone(500, "eror", "user not found", res)
        }
    })
})

app.delete('/user/delete', (req, res) => {
    const { id } = req.body
    const sql = `DELETE FROM users WHERE id= ${id}`
    db.query(sql, (err, data) => {
        if (err) respone(500, "invalid", "error ngab", res)
        if (data?.affectedRows) {
            const format = {
                isSucces: data.affectedRows,
                message: data.message,
            }
            respone(200, format, "successfuly deleted", res)
        } else {
            respone(500, "eror", "user not found", res)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})