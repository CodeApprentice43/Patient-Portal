import express from 'express'
import patientService from '../services/patientService'
import { toNewPatient,toNewEntry } from "../utils";
const patientRouter = express.Router()

patientRouter.get('/',(_req,res)=>{
    res.send(patientService.getEntries())
})

patientRouter.post('/',(req,res)=>{
    try {
        const patient = toNewPatient(req.body)
        const newPatient = patientService.addPatient(patient)
        res.json(newPatient)
    
    
    }catch(error:unknown){
        let  errormsg = 'something went wrong'

        if(error instanceof Error)
        {
            errormsg+= ':'+error.message
        }
        res.status(400).send(errormsg)
    }
})

patientRouter.post('/:id/entries',(req,res)=>{

    try{
    
        const entry = req.body
        const id = req.params.id
        const baseEntry = toNewEntry(entry)
        const newEntry = patientService.addEntry(baseEntry,id)
        console.log(newEntry,'this is from the backend ')
        res.json(newEntry)
    
    }catch(error:unknown){
        let message = 'Error adding entry'
        if(error instanceof Error)
        {
            message+= ':'+error.message
        }
        res.status(400).send(message)
    }
   
})
patientRouter.get('/:id',(req,res)=>{
    try{
    const id = req.params.id
    const patient = patientService.getPatient(id)
    res.json(patient)
    }catch(error:unknown){
        let message = 'Error retrieving patient data'
        if(error instanceof Error)
        {
            message+= ':'+error.message
        }
        res.status(400).send(message)
    }
})
export default patientRouter