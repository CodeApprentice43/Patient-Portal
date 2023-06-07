import axios from 'axios'
import { Diagnose } from '../types'
import { apiBaseUrl } from '../constants'
const getAll = async ()=> {
   const response = await axios.get<Diagnose[]>(`${apiBaseUrl}/diagnoses`)
   return  response.data
}

export default{
    getAll
}