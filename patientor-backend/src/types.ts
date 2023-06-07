export enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other'

}

  
export type Diagnose = {
    code : String,
    name: String,
    latin? : string 
}
export enum HealthCheckRating {
    'Healthy' = 0,
    'LowRisk' = 1,
    'HighRisk' = 2,
    'CriticalRisk' = 3
  }
  
interface BaseEntry{
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose["code"]>;
}

  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

  interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare'
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    }
  }

  export interface Discharge {
    date: string,
    criteria: string
  }
  interface Hospital extends BaseEntry{
    type : 'Hospital'
    discharge : Discharge
  }
  
export type Entry = 
    
    |HealthCheckEntry
    |OccupationalHealthcareEntry
    |Hospital

export type Patient = {
    id: String,
    name : String,
    dateOfBirth: String,
    ssn : String,
    gender: Gender
    occupation: String,
    entries: Entry[]
}
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

 

  export type NewEntry = DistributiveOmit<Entry, "id">;

  export type newBaseEntry = Omit<BaseEntry,'id'>

export type newPatientEntry = Omit<Patient,'id'>

export type restrictedPatient = Omit<Patient,'ssn'>
