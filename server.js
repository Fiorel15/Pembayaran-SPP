const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
// Call Router
let siswa = require ("./router/siswa")
let kelas = require ("./router/kelas")
let spp = require ("./router/spp")
let petugas = require("./router/petugas")
let pembayaran = require("./router/pembayaran")
// let auth = require("./router/auth")

app.use("/siswa", siswa)
app.use("/kelas", kelas)
app.use("/spp", spp)
app.use("/petugas", petugas)
app.use("/pembayaran", pembayaran)

// app.use("/auth", auth)

app.listen(8000, function (err) {
    if(!err)
        console.log("server run on port 8000");
    else console.log(err);
})