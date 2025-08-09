require('dotenv').config()
const mysql = require('mysql2')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const connection = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

connection.connect((err) => {
    if(err) throw err
    console.log('Connected to database')
})

// patients
app.get('/patients', (req, res) =>{
    connection.query('SELECT * FROM patients', (err, results) => {
        if(err) throw err
        res.send(results)
    })
})
app.post('/patients', (req, res) => {
    const {name,email} = req.body
    connection.query('INSERT INTO patients(name,email) VALUES (?,?)', [name,email], (err, results) => {
        if(err) throw err
        res.send({id: results.insertId, name, email})
    })
} )
app.put('/patients/:id', (req, res) =>{
    const {id} = req.params
    const {name, email} = req.body
    connection.query('UPDATE patients SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, results) => {
        if(err) throw err
        res.send({id, name, email})
    })
})
app.delete('/patients/:id', (req, res) => {
    const {id} = req.params
    connection.query('DELETE FROM patients WHERE id = ?', id, (err, results) => {
        if(err) throw err
        res.send({message: 'Patient deleted successfully', id})
    })
})

// medics
app.get('/medics', (req, res) =>{
    connection.query('SELECT * FROM medics', (err, results) => {
        if(err) throw err
        res.send(results)
    })
})
app.post('/medics', (req, res) => {
    const name = req.body.name
    connection.query('INSERT INTO medics(name) VALUES (?)', name, (err, results) => {
        if(err) throw err
        res.send({id: results.insertId, name})
    })
})
app.put('/medics/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body
    connection.query('UPDATE medics SET name = ? WHERE id = ?', [name, id], (err, results) => {
        if (err) throw err
        res.send({id, name})
    })
})
app.delete('/medics/:id', (req, res) => {
    const {id} = req.params
    connection.query('DELETE FROM medics WHERE id = ?', id, (err, results) => {
        if(err) throw err
        res.send({message: 'Medic deleted successfully', id})
    })
})

// appointments
app.get('/appointments', (req, res) =>{
    connection.query('SELECT * FROM appointments', (err, results) => {
        if(err) throw err
        res.send(results)
    })
})
app.post('/appointments', (req, res) => {
    const {date, time, id_patient, id_medic, id_place, payment_method, status, id_motive} = req.body
    connection.query('INSERT INTO appointments(date, time, id_patient, id_medic, id_place, payment_method, status, id_motive) VALUES (?,?,?,?,?,?,?,?)',
        [date, time, id_patient, id_medic, id_place, payment_method, status, id_motive], (err, results) => {
        if(err) throw err
        res.send({id: results.insertId, date, time, id_patient, id_medic, id_place, payment_method, status, id_motive})
    })
})
app.put('/appointments/:id', (req, res) =>{
    const {id} = req.params
    const {date, time, id_patient, id_medic, id_place, payment_method, status, id_motive} = req.body
    connection.query('UPDATE appointments SET date = ?, time = ?, id_patient = ?, id_medic = ?, id_place = ?, payment_method = ?, status = ?, id_motive = ? ',
        [date, time, id_patient, id_medic, id_place, payment_method, status, id_motive, id], (err, results) => {
        if(err) throw err
        res.send({id, date, time, id_patient, id_medic, id_place, payment_method, status, id_motive})
        })
})
app.delete('/appointments/:id', (req, res) => {
    const {id} = req.params
    connection.query('DELETE FROM appointments WHERE id = ?', id, (err, results) => {
        if(err) throw err
        res.send({message: 'Appointment deleted successfully', id})
    })
})

// motives
app.get('/motives', (req, res) =>{
    connection.query('SELECT * FROM motives', (err, results) => {
        if(err) throw err
        res.send(results)
    })
})
app.post('/motives', (req, res) => {
    const {motive} = req.body
    connection.query('INSERT INTO motives(motive) VALUES (?)', [motive], (err, results) => {
        if(err) throw err
        res.send({id: results.insertId, motive})
    })
})
app.put('/motives/:id', (req, res) =>{
    const {id} = req.params
    const {motive} = req.body
    connection.query('UPDATE motives SET motive = ? WHERE id = ?', [motive, id], (err, results) => {
        if(err) throw err
        res.send({id, motive})
    })
})
app.delete('/motives/:id', (req, res) => {
    const {id} = req.params
    connection.query('DELETE FROM motives WHERE id = ?', id, (err, results) => {
        if(err) throw err
        res.send({message: 'Motive deleted successfully', id})
    })
})


// places
app.get('/places', (req, res) =>{
    connection.query('SELECT * FROM places', (err, results) => {
        if(err) throw err
        res.send(results)
    })
})
app.post('/places', (req, res) => {
    const {place} = req.body
    connection.query('INSERT INTO places(place) VALUES (?)', [place], (err, results) => {
        if(err) throw err
        res.send({id: results.insertId, place})
    })
})
app.put('/places/:id', (req, res) =>{
    const {id} = req.params
    const {place} = req.body
    connection.query('UPDATE places SET place = ? WHERE id = ?', [place, id], (err, results) => {
        if(err) throw err
        res.send({id, place})
    })
})
app.delete('/places/:id', (req, res) => {
    const {id} = req.params
    connection.query('DELETE FROM places WHERE id = ?', id, (err, results) => {
        if(err) throw err
        res.send({message: 'Place deleted successfully', id})
    })
})

// specialities
app.get('/specialities', (req, res) =>{
    connection.query('SELECT * FROM specialities', (err, results) => {
        if(err) throw err
        res.send(results)
    })
})
app.post('/specialities', (req, res) => {
    const {speciality} = req.body
    connection.query('INSERT INTO specialities(speciality) VALUES (?)', [speciality], (err, results) => {
        if(err) throw err
        res.send({id: results.insertId, speciality})
    })
})
app.put('/specialities/:id', (req, res) =>{
    const {id} = req.params
    const {speciality} = req.body
    connection.query('UPDATE specialities SET speciality = ? WHERE id = ?', [speciality, id], (err, results) => {
        if(err) throw err
        res.send({id, speciality})
    })
})
app.delete('/specialities/:id', (req, res) => {
    const {id} = req.params
    connection.query('DELETE FROM specialities WHERE id = ?', id, (err, results) => {
        if (err) throw err
        res.send({message: 'Speciality deleted successfully', id})
    })
})

// speciality_medic
app.get('/speciality_medic', (req, res) =>{
    connection.query('SELECT * FROM speciality_medic', (err, results) => {
        if(err) throw err
        res.send(results)
    })
})
app.post('/speciality_medic', (req, res) => {
    const {id_medic, id_speciality} = req.body
    connection.query('INSERT INTO speciality_medic(id_medic, id_speciality) VALUES (?,?)', [id_medic, id_speciality], (err, results) => {
        if(err) throw err
        res.send({id_medic, id_speciality})
    })
})
app.delete('/speciality_medic/:id_medic', (req, res) => {
    const {id_medic} = req.params
    connection.query('DELETE FROM speciality_medic WHERE id_medic = ?',
        id_medic,
        (err, results) => {
            if (err) throw err
            res.send({message: 'Speciality medic deleted successfully', id_medic})
        })
})

app.listen(3000, () =>
{
    console.log('Server is running')
})