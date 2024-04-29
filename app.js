const express = require('express');
const mysql = require('mysql');
const app = express();
const http = require("http").Server(app)
const io = require("socket.io")(http)
const port = 3000;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'phrases_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

app.get('/post_data', (req, res) => {
    const sql = "SELECT * FROM phrases";
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving phrases:', err);
            res.status(500).send('Error retrieving phrases');
            return;
        }
        res.json(result);
    });
});

socket.on("/make_post", function (data) {
    console.log(data)
  })


// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});