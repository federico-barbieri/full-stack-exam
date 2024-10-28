import express from "express"
import router from "./router"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    console.log("hello from expresssss")
    res.status(200)
    res.json({message: 'hello'})
})

app.use('/api', router)

export default app