import data from '../data/patients';
import { Patient, restrictedPatient, newPatientEntry, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

let patientEntries: Patient[] = data as Patient[];

const getEntries = (): Patient[] => {
  return patientEntries;
};

const getRestrictedEntries = (): restrictedPatient[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patientEntries.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

const addPatient = (newPatient: newPatientEntry): Patient => {
  const patient = { ...newPatient, id: uuid() };
  patientEntries.push(patient);
  return patient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry = { ...entry, id: uuid() };
  patientEntries = patientEntries.map((p) =>
    p.id === id ? { ...p, entries: p.entries.concat(newEntry) } : p
  );
  return newEntry;
};

export default {
  getEntries,
  getRestrictedEntries,
  addPatient,
  getPatient,
  addEntry
};
