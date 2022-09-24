const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');;
const cors = require('cors');

// app.use(cors());
// app.use(cors({
//     origin: '*'
// }));
// app.all('*', function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
// });
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
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
    console.log(req);
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
    let sql = "SELECT * FROM employee WHERE id= '" + req.params.id+"'";
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

// login
app.post('/api/auth/login', (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password,
    };
    console.log("DISINI " + req.body.username);
    let sql = "SELECT * FROM employee WHERE username='" + req.body.username + "' and password= '" + req.body.password + "'";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            // "response": results
            "response": "success"
        }));
    });
});

//Server listening
app.listen(1313, () => {
    console.log('Server berjalan di port 1313...');
});