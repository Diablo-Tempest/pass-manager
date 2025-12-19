/* eslint-disable no-undef */
import express from 'express'
import mongoose from 'mongoose'
import { PassOP } from './models/Schema.js'
import bodyParser from 'body-parser'
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)

app.get('/', async(req, res) => {
    const datas = await PassOP.find({}).exec()
    res.json(datas)
})

// add password
app.post('/', async(req, res) => {
    await PassOP.create({
        id: uuidv4(),
        siteURL: req.body.siteURL,
        username: req.body.username,
        password: req.body.password,
    })
    res.send({create: true})
})

//delete password
app.delete('/', async(req, res) => {
    await PassOP.deleteOne({
        id: req.body.id
    })
    res.send({delete: true})
})

//update password
app.put('/', async(req, res) => {
    await PassOP.findOneAndUpdate({
        id: req.body.id,
    }, {
        siteURL: req.body.siteURL,
        username: req.body.username,
        password: req.body.password,
    })
    res.send({update: true})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})