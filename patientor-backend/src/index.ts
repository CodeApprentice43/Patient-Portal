import express from 'express'
import patientRouter from './routes/patients'
import diagnosticRouter from './routes/diagnostic'
const app = express()
const PORT = 3001
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/patients',patientRouter)
app.use('/api/diagnoses',diagnosticRouter)


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})