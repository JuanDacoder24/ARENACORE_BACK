import express, { application } from 'express'
import { Application, Request, Response } from 'express' 
import dotenv from 'dotenv'
import cors from 'cors'


//Cargar variables de entorno
dotenv.config()

//Crear aplicacion express
const app: Application = express()
const PORT = process.env.PORT || 3000

//Middleware
app.use(express.json())

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))

//Ruta raiz
app.get('/', (req, res) =>{
    res.json({
        mensaje: 'API Gestion Torneos',
        //aca iran los endpoints
    })
})

//Manejo de rutas no encotradas
app.use((req, res) =>{
    res.status(404).json({error: 'Ruta no encontrada'})
})

//Iniciar servidor
app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

export default app