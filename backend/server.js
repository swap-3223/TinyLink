import express from 'express'
import router  from './routes/LinksRoute.js';
import { redirectLink } from './controllers/LinksController.js';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/api/links',router)

app.get("/healthz", (req, res) => {
  res.status(200).json({
    ok: true,
    version: "1.0",
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});


app.get('/:code',redirectLink)



app.listen(PORT,()=>{console.log("server running on port",PORT)})