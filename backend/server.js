const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'st_luke'
});

db.connect((err) => {
    if(err){
        console.log('failed to connect db', err);
    }else{
        console.log('connected to db');
    }
})
//register user
app.post('/api/signup', (req, res) => {
    const {username, password} = req.body;
    const Checksql = 'SELECT * FROM users WHERE username = ?';
    db.query(Checksql, [username], async(err, results) => {
        if(err)  return res.status(500).json({error:'database error'});
        if(results.length > 0) return res.status(400).json({message: 'user already exists'});
       
            try {
                const sql = 'INSERT INTO users (username, password) VALUES(?, ?)';
                const hashedPassword = await bcrypt.hash(password, 10)
                db.query(sql, [username, hashedPassword], (err) => {
                    if(err){
                        return res.status(500).json({error: 'failed to signup'});
                    }
                    else{
                        return res.status(201).json({message: 'signup successful!'});
                    }
                })
            } catch (err) {
                if(err){
                    return res.status(500).json({error: 'failed to hash password'});
                }else{
                    return res.status(201).json({message: 'hashed password successful!'})
                }
            }
        })

    })
//login user
    app.post('/api/login', (req,res) => {
        const {username, password} = req.body;
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], async(err, results) => {
            if(err) return res.status(500).json({error: 'database error'});
            if(results.length === 0) return res.status(404).json({error: 'user not found'});

            const user = results[0];
            const secretKey = 'ttgf8gewvyf';
            const token = jwt.sign(
                {user: user.username, user: user.userId},
                secretKey,
                {expiresIn: '1h'}
            )
                const isMatch = await bcrypt.compare(password, user.password);
                if(!isMatch){
                    return res.status(500).json({error: 'invalid credentials!'});
                }else{
                    return res.status(201).json({message: 'successful login', token});
                }
        })
    })

//add departments

app.post('/api/department', (req, res) => {
    const {depname} =req.body;
    const sql = 'INSERT INTO department(depname) VALUES(?)';
    db.query(sql, [depname], (err) => {
        if(err){
            return res.status(500).json({error: 'failed to add department'});
        }else{
            return res.status(201).json({message: 'successful added department!'});
        }
    })
})

//add post 
app.post('/api/post', (req, res) => {
    const {PostTitle} =req.body;
    const sql = 'INSERT INTO post(PostTitle) VALUES(?)';
    db.query(sql, [PostTitle], (err) => {
        if(err){
            return res.status(500).json({error: 'failed to add post'});
        }else{
            return res.status(201).json({message: 'successful added post!'});
        }
    })
})

//fetch posts
app.get('/api/getPosts', (req, res) => {
    const sql = 'SELECT * FROM post';
    db.query(sql, (err, result) => {
        if(err) {
            return res.status(500).json({error: 'failed to get posts'});
        }else{
            return res.json(result);
        }
    })
})
//fetch department
app.get('/api/getDepartment', (req, res) => {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, result) => {
        if(err) {
            return res.status(500).json({error: 'failed to get department'});
        }else{
            return res.json(result);
        }
    })
})
//delete department
app.delete('/api/deleteDepart/:id', (req, res) => {
  const {id} = req.params
  const sql = 'DELETE FROM department WHERE depId = ?';
  db.query(sql, [id] , (err) => {
    if(err){
        return res.status(500).json({error: 'failed to delete'});
    }else{
        return res.status(201).json({message: 'deleted successful!'});
    }
  })
})

//update department
app.put('/api/updateDepart/:id', (req, res) => {
    const {id} = req.params;
    const {depname} = req.body;
    const sql = 'UPDATE department SET depname = ? WHERE depId = ?';
    db.query(sql, [id, depname], (err) => {
        if(err){
            return res.status(500).json({error: 'failed to update'});
        }else{
            return res.status(201).json({message: 'updated successfully!'});
        }
    })
})

//add staff

app.post('/api/staff', (req, res) => {
    const {
        post,
        firstname,
        lastname,
        gender,
        dob,
        email,
        phone,
        address,
        department
    } = req.body;
    const sql = 'INSERT INTO staff(postId, firstname, lastname, gender, dob, email, phone, address, depId) VALUES(?,?,?,?,?,?,?,?,?)';
    db.query(sql, [post,
        firstname,
        lastname,
        gender,
        dob,
        email,
        phone,
        address,
        department], (err) => {
            if(err){
                return res.status(500).json({error: 'failed to add staff'});
            }else{
                return res.status(201).json({message: 'well added staff!'});
            }
        })
});
//get employees
app.get('/api/getStaff', (req,res) => {
    const sql = 'SELECT * FROM staff';
    db.query(sql, (err, results) => {
        if(err){
            return res.status(500).json({error: 'failed to fetch staffs'});
        }else{
            return res.status(201).json(results);
        }
    })
})

app.get('/api/report', (req, res) => {
    const sql = `SELECT 
  CONCAT(staff.firstname, ' ', staff.lastname) AS name,
  staff.gender, 
  staff.dob, 
  staff.email, 
  staff.phone, 
  staff.address, 
  post.postTitle, 
  department.depname
FROM staff
JOIN post ON staff.postId = post.postId
JOIN department ON staff.depId = department.depId;
 `
 db.query(sql , (err, results) => {
    if(err){
        return res.status(500).json({error: 'failed to fetch satff'});
    }else{
        return res.status(201).json(results);
    }
 })
})
app.listen(5000, () => {
    console.log('server is running on http://localhost:5000');
})