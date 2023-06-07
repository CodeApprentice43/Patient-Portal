import diagnosisService from '../services/diagnosisService'
import express from 'express'

const diagnosticRouter = express.Router()

diagnosticRouter.get('/',(_req,res)=>{
    res.send( diagnosisService.getEntries())
})

export default diagnosticRouter