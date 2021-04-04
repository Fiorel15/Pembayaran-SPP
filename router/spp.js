const express = require("express")
const app = express()

// call model for spp
const spp = require("../models/index").spp

const authAdmin = require("../authAdmin")

app.use(express.urlencoded({extended: true}))

app.get("/", authAdmin, async(req,res) => {
    spp.findAll()
        .then(spp => {
            res.json({
                data: spp
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.post("/", authAdmin, async(req,res) => {
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }

    spp.create(data)
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

app.put("/", authAdmin, async(req, res) => {
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal.nominal
    }

    let param = {
        id_spp: req.body.id_spp
    }

    spp.update(data, {where: param})
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

app.delete("/:id_spp", auth, async(req,res) => {
    let param = {
        id_spp: req.params.id_spp
    }

    spp.destroy({where: param})
        .then (result => {
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