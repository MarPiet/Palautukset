import patientData from '../../data/patients';
import { NewPatientEntry, PatientEntry, PublicPatient, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry } from '../types';


const getEntries = (): PublicPatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) =>({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
};

const getPatient = (id: string): PatientEntry | undefined => {
  const patient = patientData.find(patient => patient.id === id);
  return patient;
};
  
const addPatient = ( entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: (patientData.length + 1).toString(),
    ...entry
    };
    newPatientEntry.entries = []
    patientData.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = ( entry: HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry, id: string): Entry => {
  const patient = patientData.find(patient => patient.id === id);
  const newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    id: (patient!.entries.length + 1).toString(),
    ...entry
    };
  patient?.entries.push(newEntry);
  return newEntry;
};
  
  export default {
    getEntries,
    addPatient,
    getPatient,
    addEntry
  };