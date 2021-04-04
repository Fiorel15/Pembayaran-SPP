const express = require("express")
const app = express()

// call models 
const models = require("../models/index")
const pembayaran = models.pembayaran

const authSiswa = require('../authSiswa')
const authAdmin = require('../authAdmin')
const authPetugas = require('../authPetugas')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ambil data pembayaran sbg petugas
app.get("/petugas", authPetugas, async(req,res) => {
    let result = await pembayaran.findAll({
        include: [
            "petugas",
            "siswa",
            {
                model: models.siswa,
                as: "siswa",
                include: ["spp", "kelas"]
            }
        ]
    })
    res.json(result)
})

// ambil data pembayaran sbg admin
app.get("/admin", authAdmin, async(req,res) => {
    let result = await pembayaran.findAll({
        include: [
            "petugas",
            "siswa",
            {
                model: models.siswa,
                as: "siswa",
                include: ["spp", "kelas"]
            }
        ]
    })
    res.json(result)
})

// ambil data pembayaran sbg siswa
app.get("/siswa/:id_siswa", authSiswa, async(req,res) => {
    let param = { id_siswa: req.params.id_siswa }
    let result = await pembayaran.findAll({
        where:param,
        include: ["petugas",
            "siswa",
            {
                model: models.siswa,
                as: "siswa",
                include: ["spp", "kelas"]
            }
        ]
    })
    res.json(result)
})

// ambil data pembayaran berdasarkan id_siswa
app.get("/:id_siswa", auth, async(req,res) => {
    let param ={ id_siswa: req.params.id_siswa }
    let result = await pembayaran.findAll({
        where: param,
        include: [
            "siswa",
            {
                model: models.petugas,
                as : "petugas"
            }
        ]
    })
    res.json(result)
})

// tambah data pembayaran sbg petugas
app.post("/petugas", authPetugas, async(req,res) => {
    let current = new Date().toISOString().split('T')[0]

    let data = {
        id_petugas: req.body.id_petugas,
        id_siswa: req.body.id_siswa,
        tgl_bayar: current,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }

    pembayaran.create(data)
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

// tambah data pembayaran sbg admin
app.post("/admin", authAdmin, async(req,res) => {
    let current = new Date().toISOString().split('T')[0]

    let data = {
        id_petugas: req.body.id_petugas,
        id_siswa: req.body.id_siswa,
        tgl_bayar: current,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }

    pembayaran.create(data)
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

// edit data pembayaran sbg petugas
app.put("/petugas", authPetugas, async(req,res) => {
    let param = {
         id_pembayaran: req.body.id_pembayaran 
    }

    let data = {
        id_petugas: req.body.id_petugas,
        id_siswa: req.body.id_siswa,
        tgl_bayar: req.body.tgl_bayar,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }

    pembayaran.update(data, { where: param })
        .then(result => {
            res.json({ message: "data has been updated" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

// edit data pembayaran sbg admin
app.put("/admin", authAdmin, async(req,res) => {
    let param = {
         id_pembayaran: req.body.id_pembayaran 
    }

    let data = {
        id_petugas: req.body.id_petugas,
        id_siswa: req.body.id_siswa,
        tgl_bayar: req.body.tgl_bayar,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }

    pembayaran.update(data, { where: param })
        .then(result => {
            res.json({ message: "data has been updated" })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

// hapus data pembayaran sbg petugas
app.delete("/petugas/:id_pembayaran", authPetugas, async(req,res) => {
    let param = {
        id_pembayaran: req.params.id_pembayaran
    }

    pembayaran.destroy({where: param})
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
})

// hapus data pembayaran sbg petugas
app.delete("/admin/:id_pembayaran", authAdmin, async(req,res) => {
    let param = {
        id_pembayaran: req.params.id_pembayaran
    }

    pembayaran.destroy({where: param})
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
})

module.exports = app