import express from 'express'

const PORT = 1904

console.log("Start setting up server")
let app = express()

app.use(function(req, rsp) {
    console.log("GET received")
    rsp.end("SLB1")
})

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`))

console.log("End setting up server")