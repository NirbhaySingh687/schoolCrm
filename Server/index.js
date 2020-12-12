const express = require('express')
const cors= require('cors')

const app= express()
const port =5000

app.use(express.json())//req.body
app.use(cors());

//Router
app.use("/auth",require('./router/login'))
app.use("/user",require('./router/data'))

//Start Server
app.listen(port,()=>{
    console.log(`Server is up and  running on Port ${port}`)
})
