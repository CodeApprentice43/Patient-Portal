import { Diagnose } from "../types";
import data from '../data/diagnose'

const diagnoseEntries : Diagnose[] = data as Diagnose[]

const getEntries = () : Diagnose[] => 
{
    return diagnoseEntries
}

export default {
    getEntries
}



