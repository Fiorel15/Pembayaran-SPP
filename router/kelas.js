const express = require("express")
const app = express()

// call model for kelas
const kelas = require("../models/index").kelas

const authAdmin = require("../authAdmin")

// middleware for allow the request from body
app.use(express.urlencoded({extended:true}))

// END POINT u/ menampilkan seluruh data kelas
app.get("/", authAdmin, async(req,res) => {
    kelas.findAll()
        .then(kelas => {
            res.json({
                data: kelas
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

// END POINT u/ menambahkan data kelas
app.post("/", authAdmin, async(req,res) => {
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }

    kelas.create(data)
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
})

// END POINT Edit data kelas
app.put("/", authAdmin, async(req,res) => {
    let data = {
        nama_kelas: req. body.nama_kelas,
        kompetensi_keahlian:req.body.kompetensi_keahlian
    }

    let param = {
        id_kelas: req.body.id_kelas
    }

    kelas.update(data, {where: param})
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

// END POINT DELETE data kelas
app.delete("/:id_kelas", authAdmin, async(req,res) => {
    let param = {
        id_kelas: req.params.id_kelas
    }
    kelas.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app