import express, { json } from 'express'
import { pool } from './db.js';
import router  from './routes/LinksRoute.js';
import { redirectLink } from './controllers/LinksController.js';
const app = express()

app.use(express.json())
app.use('/api/links',router)
app.get('/:code',redirectLink)


app.get('/healthz',(req,res)=>{
    res.status(200).json({ok:"true",version:"1.0"})
})

app.listen(5000,()=>{console.log("server running")})