const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_mgmt_db'
});

//connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql tersambung...');
});

//tampilkan semua data product
app.get('/api/employee', (req, res) => {
    let sql = "SELECT * FROM employee";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//tampilkan data employee berdasarkan id
app.get('/api/employee/:id', (req, res) => {
    let sql = "SELECT * FROM employee WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//Tambahkan data employee baru
app.post('/api/employee', (req, res) => {
    let data = {
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        birth_date: req.body.birth_date,
        basic_salary: req.body.basic_salary,
        status_employee: req.body.status_employee,
        group_employee: req.body.group_employee,
        description_employee: req.body.description_employee
    };
    let sql = "INSERT INTO employee SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//Edit data employee berdasarkan id
app.put('/api/employee/:id', (req, res) => {
    let sql = "UPDATE employee SET username='" + req.body.username + "', birth_date='" + req.body.birth_date + "' WHERE id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//Delete data employee berdasarkan id
// app.delete('/api/employee/:id',(req, res) => {
//   let sql = "DELETE FROM employee WHERE id="+req.params.id+"";
//   let query = conn.query(sql, (err, results) => {
//     if(err) throw err;
//       res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
//   });
// });

//Server listening
app.listen(3000, () => {
    console.log('Server berjalan di port 3000...');
});