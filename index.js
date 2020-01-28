'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = 'TMCondor'
const Pass = 'WeQXjTEXSN4qzQfG'

const Course = require('./models/course')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/api/course/:name/:page', (req,res) => {
    Course.find({ name: { $regex: req.params.name, "$options": "i" } }, (err, courses) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if(!courses) return res.status(404).send({message:'No existen productos'})
        res.status(200).send(courses)
    }).sort({id:1}).skip(24*req.params.page).limit(24)
})

app.get('/api/course//:page', (req,res) => {
    if(req.params.name === null){req.params.name = " "}
    Course.find({}, (err, courses) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if(!courses) return res.status(404).send({message:'No existen productos'})
        res.status(200).send(courses)
    }).sort({id:1}).skip(24*req.params.page).limit(24)
})

app.get('/', (req,res) => {

    res.status(200).send('Welcome to End Point. Use /api/course/:name/:page')
})

mongoose.connect(`mongodb+srv://${User}:${Pass}@cluster0-lxq5v.mongodb.net/courses?retryWrites=true&w=majority`, {useNewUrlParser: true}, (err,res) => {
    if(err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    console.log('Conexión a la Base de Datos establecida...')

    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})