import { Diagnose, EntryTypes,EntryValues} from "../../types"
import HealthEntryForm from './Forms/HealthCheck';
import OccupationalEntryForm from './Forms/Occupational';
import HospitalEntryForm from './Forms/Hospital';
import { assertNever } from "../PatientDetails/PatientDetails";
import { useState,useEffect } from "react";
import diagnosisService from '../../services/diagnosis'
interface Props {
    formType:EntryTypes,
    closeModal:()=>void,
    onSubmit :({entry}:{entry:EntryValues})=>void
}
const RenderForm = ({formType,closeModal,onSubmit}:Props)=>{
    const [diagnoses,setDiagnoses] = useState<Diagnose[]>([])
    useEffect(()=>{
        const fetchList = async()=>{
            const response = await diagnosisService.getAll()
            setDiagnoses(response)
        }
        void fetchList()
    },[])

    switch(formType)
    {
        case EntryTypes.Occupational:
            return < OccupationalEntryForm diagnosisList = {diagnoses} onSubmit={onSubmit} closeModal={closeModal}/>
      
         case EntryTypes.Health:
            return <HealthEntryForm diagnosisList = {diagnoses} onSubmit={onSubmit} closeModal={closeModal}/>
         
         case EntryTypes.Hospital:
             return <HospitalEntryForm diagnosisList = {diagnoses} onSubmit={onSubmit} closeModal={closeModal}/>
        
        default:
            return assertNever(formType)

        
    }
}
export default RenderForm