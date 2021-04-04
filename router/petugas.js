const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const petugas = require("../models/index").petugas

const md5 = require("md5")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image_petugas")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

const authAdmin = require("../authAdmin")
const SECRET_KEY_ADMIN = "masukadmin"
const authPetugas = require("../authPetugas")
const SECRET_KEY_PETUGAS = "masukpetugas"
const jwt = require('jsonwebtoken')

// end point petugas
app.get("/:id_petugas", authPetugas, async(req,res) => {
    let param = {
        id_petugas: req.params.id_petugas
    }
    let result =  await petugas.findAll({where: param})
    res.json(result)
    // console.log(error);
})

// end point admin
app.get("/", authAdmin, async(req,res) => {
    let result =  await petugas.findAll({where: param})
    res.json(result)
    // console.log(error);
})

app.post("/", authAdmin, upload.single("image"), async(req,res) => {
    if(!req.file){
        res.json({
            message: "no uploaded image"
        })
    } else {
        let data = {
            username: req.body.username,
            password: md5(req.body.password),
            nama_petugas: req.body.nama_petugas,
            level: req.body.level,
            image: req.file.filename
        }

        petugas.create(data)
            .then(result => {
                res.json({
                    message: "data has been inserted",
                    data: result
                })
            })
            .catch(err => {
                res.json({
                    message: err.message
                })
            })
    }
})

app.put("/", authAdmin, upload.single("image"), async(req,res) => {
    let param = {
        id_petugas: req.body.id_petugas
    }  

    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level,
        image: req.file.filename
    }

    if(req.file){
        // get data by id
        let row = await petugas.findOne({where: param})
        let oldFileName = row.image

        // delete old file
        let dir = path.join(__dirname,"../image_petugas",oldFileName)
        fs.unlink(dir, err => console.log(err))

        // set new filename
        data.image = req.file.filename
    }

    petugas.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(err => {
            res.json({
                message: err.message
            })
        })
})

app.delete("/:id_petugas", authAdmin, async(req,res) => {
    try{
        let param = {
            id_petugas: req.params.id_petugas
        }

        let result = await petugas.findOne({where: param})
        let oldFileName = result.image

        // delete old file
        let dir = path.join(__dirname,"../image_petugas",oldFileName)
        fs.unlink(dir,err => console.log(err))

        // delete data
        petugas.destroy({where: param})
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
    } 
    catch(error) {
        res.json({
            message: error.message
        })
    }
})

app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await petugas.findOne({where: params})

    if(result){
        let payload = JSON.stringify(result)
        let jabatan = (result.level).toLowerCase()

        if(jabatan === "admin"){
            // generate token
            let token = jwt.sign(payload, SECRET_KEY_ADMIN)
            res.json({
                logged: true,
                data: result,
                jabatan: jabatan,
                token: token
            })
        } else {
            let token = jwt.sign(payload, SECRET_KEY_PETUGAS)
            res.json({
                logged: true,
                data: result,
                jabatan: jabatan,
                token: token
            })
        }
    } else {
        res.json({
            logged: false,
            message: 'Invalid username or password'
        })
    }
})

module.exports = app
