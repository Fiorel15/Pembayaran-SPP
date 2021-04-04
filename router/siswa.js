const express = require("express")
const app = express ()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const md5 = require("md5")

// cal model for siswa
const models = require("../models/index")
const siswa = models.siswa


const multer = require("multer")
const path = require("path")
const fs = require("fs")

const jwt = require('jsonwebtoken')
const authSiswa = require('../authSiswa')
const SECRET_KEY_SISWA = 'masuksiswa'
const authAdmin = require('../authAdmin')
const authPetugas = require('../authPetugas')

// Tentukan di mana file akan disimpan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image_siswa")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

// END POINT menampilkan seluruh data siswa sbg siswa
app.get("/:id_siswa", authSiswa, (req,res) => {
    let param = {
        id_siswa: req.params.id_siswa
    }
    let result = siswa.findAll(
        {
            where: param,
            include: ["kelas", "spp"]
        })
    res.json(result)
})

// end point petugas
app.get("/:id_siswa", authPetugas, (req,res) => {
    let param = {
        id_siswa: req.params.id_siswa
    }
    let result = siswa.findAll(
        {
            where: param,
            include: ["kelas", "spp"]
        })
    res.json(result)
})

// end point admin
app.get("/", authAdmin, (req,res) => {
    let result = siswa.findAll(
        {
            include: ["kelas", "spp"]
        })
    res.json(result)
})

// end point petugas
app.get("/id/:id_siswa", authAdmin, (req,res) => {
    let param = {
        id_siswa: req.params.id_siswa
    }
    let result = siswa.findOne(
        {
            where: param,
            include: ["kelas", "spp"]
        })
    res.json(result)
})


// END POINT u/ menambahkan data siswa
app.post("/", authAdmin, upload.single("image"), async(req,res) => {
    if(!req.file) {
        res.json({
            message: "no uploaded image"
        })
    } else {
        let data = {
            nis: req.body.nis,
            nama: req.body.nama,
            id_kelas: req.body.id_kelas,
            alamat: req.body.alamat,
            no_telp: req.body.no_telp,
            id_spp: req.body.id_spp,
            image: req.file.filename,
            username: req.body.username,
            password: md5(req.body.password)
        }

        siswa.create(data)
            .then(result => {
                res.json({
                    message: "data has been inserted",
                    data: result
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    }
})

app.put("/", authAdmin, upload.single("image"), async(req,res) => {
    let param = {
        id_siswa: req.body.id_siswa
    }

    let data = {
        nis: req.body.nisc,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp,
        image: req.file.filename,
        username: req.body.username,
        password: md5(req.body.password)
    }

    if(req.file) {
        // get data by id
        let row = await siswa.findOne({where: param})
        let oldFileName = row.image

        // delete old file
        let dir = path.join(__dirname,"../image_siswa",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // set new filename
        data.image = req.file.filename
    }

    siswa.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id_siswa", authAdmin, async(req,res) => {
    try{
        let param = {
            id_siswa: req.params.id_siswa
        }
        let result = await siswa.findOne({where: param})
        let oldFileName = result.image

        // delete old file
        let dir = path.join(__dirname,"../image_siswa",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        siswa.destroy({where: param})
            .then(result => {
                res.json({
                    message: "data has been deleted"
                })
            })
            .catch(err => {
                res.json({
                    message: err.message
                })
            })
    } catch (error) {
        res.json ({
            message: error.message
        })
    }
})

app.post("/auth", async(req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await siswa.findOne({where: params})
    if(result) {
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY_SISWA)

        res.json({
            logged: true,
            data: result,
            sebagai: 'siswa',
            token: token
        })
    } else {
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

module.exports = app