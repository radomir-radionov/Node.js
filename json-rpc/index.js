const express = require('express')
const jsonRouter = require('express-json-rpc-router')
const userController = require('./controllers/user')

const app = express()

app.use(express.json())
app.use(jsonRouter({
     methods: {
        ...userController,
    }
}))
app.listen(3000, () => console.log('Example app listening on port 3000'))