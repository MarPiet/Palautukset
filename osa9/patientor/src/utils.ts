import { NewPatientEntry, Gender, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry, HealthCheckRating } from './types';
import { isString } from 'util';

/* eslint-disable @typescript-eslint/no-explicit-any */
const parseName = (name: any): string => {
    if (!name || !isString(name)){
        throw new Error('Incorrect or missing name' + name);
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const parseDateOfBirth = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date of birth ' + date);
    }
    return date;
};


const parseSSN = (ssn: any): string => {
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing SSN ' + ssn);
    }
    return ssn;
};

const parseOccupation = (occupation: any): string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation ' + occupation);
    }
    return occupation;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
};



/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object: any): NewPatientEntry => {
    return{
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: object.entries
    };
 };


 const isRating = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};

 const parseRating = (rating: any): HealthCheckRating => {
     if(rating === 0){
        return rating;
     }
    if(!rating || !isRating(rating)){
        throw new Error('Incorrect or missing rating ' + rating);
    }
    return rating;
};

const parseDescription = (description: any): string => {
    if(!description || !isString(description)){
        throw new Error('Incorrect or missing description ' + description);
    }
    return description;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date' + date);
    }
    return date;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)){
        throw new Error('Incorrect or missing specialist' + specialist);
    }
    return specialist;
};

const parseEmployerName = (employerName: any): string => {
    if (!employerName || !isString(employerName)){
        throw new Error('Incorrect or missing employerName' + employerName);
    }
    return employerName;
};
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  

 export const toNewEntry = (object: any): | Omit<HealthCheckEntry, 'id'>  | Omit<OccupationalHealthCareEntry, 'id'>  | Omit<HospitalEntry, 'id'>  => {
     switch(object.type){
         case "HealthCheck":
             return{
                type: object.type,
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist:  parseSpecialist(object.specialist),
                diagnosisCodes: object.diagnosisCodes,
                healthCheckRating: parseRating(object.healthCheckRating)
             };
        case "OccupationalHealthcare":
            return{
                type: object.type,
                description: parseDescription(object.description),
                date: parseDate(object.date),
                specialist:  parseSpecialist(object.specialist),
                diagnosisCodes: object.diagnosisCodes,
                employerName: parseEmployerName(object.employerName),
                sickLeave: object.sickLeave
             };
             case "Hospital":
                return{
                   type: object.type,
                   description: parseDescription(object.description),
                   date: parseDate(object.date),
                   specialist:  parseSpecialist(object.specialist),
                   diagnosisCodes: object.diagnosisCodes,
                   discharge: object.discharge
                };       
        default:  
            return assertNever(object);
     }


};

export default toNewPatientEntry;