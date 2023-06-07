import { newPatientEntry, HealthCheckRating, Discharge } from "./types";
import { Gender } from "./types";
import { NewEntry as newEntry, newBaseEntry } from "./types";

const assertNever = (data: never): never => {
  throw new Error(`invalid entry type ${JSON.stringify(data)}`);
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error("invalid data");
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error(date + " is not a valid date");
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseGender = (text: unknown): Gender => {
  if (!isString(text) || !isGender(text)) {
    throw new Error(text + " is not a valid gender");
  }
  return text as Gender;
};

export const toNewPatient = (object: unknown): newPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("missing fields");
  }

  if (
    "gender" in object &&
    "occupation" in object &&
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object
  ) {
    const newPatient: newPatientEntry = {
  
      name: parseString(object.name),
      occupation: parseString(object.occupation),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      entries: [],
    };
    return newPatient;
  }
  throw new Error("invalid or missing fields");
};



const toBaseEntry = (object: any): newBaseEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("missing fields");
  }

  if ("description" in object && "date" in object && "specialist" in object) {
    const entry: newBaseEntry = {
      ...object,
      specialist: parseString(object.specialist),
      description: parseString(object.description),
      date: parseDate(object.date),
      
    };
    if (object.diagnosisCodes) {
      entry.diagnosisCodes = object.diagnosisCodes;
    }
    return entry;
  }
  throw new Error("missing fields in entry");
};

const isRating = (object: any): boolean => {
  return Object.values(HealthCheckRating).includes(object);
};

const parseHealthCheckRating = (object: any): HealthCheckRating => {
  if (object === null || object === undefined || !isRating(object)) {
    throw new Error("invalid rating");
  }
  return object as HealthCheckRating;
};

const isDischarge = (object: any): boolean => {
  return isDate(object.date) && isString(object.criteria);
};

const parseDischarge = (object: any): Discharge => {
  if (
    object.date === undefined ||
    object.date === null ||
    object.criteria === null ||
    object.criteria === undefined ||
    !isDischarge(object)
  ) {
    throw new Error("invalid discharge information");
  }
  return object as Discharge;
};

export const toNewEntry = (object: any): newEntry=> {
  const newEntry = toBaseEntry(object) as newEntry;
  console.log('the new base entry is:',newEntry)
  newEntry.type = object.type
  switch (newEntry.type) {
    case "HealthCheck":
      return {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      
    case "Hospital":
      return {
        ...newEntry,
        discharge: parseDischarge(object.discharge),
      };

    case "OccupationalHealthcare":
      const occupationalEntry = { ...newEntry };
      occupationalEntry.employerName = parseString(object.employerName);
      if (occupationalEntry.sickLeave) {
        occupationalEntry.sickLeave.startDate = parseDate(
          object.sickLeave.startDate
        );
        occupationalEntry.sickLeave.endDate = parseDate(
          object.sickLeave.endDate
        );
      }
      return occupationalEntry;

    default:
      
      return assertNever(newEntry);
  }
};
