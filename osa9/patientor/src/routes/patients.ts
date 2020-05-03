import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';


const router = express.Router();

router.get('/:id', (req, res) => { 
  res.send(patientService.getPatient(req.params.id));
});

router.post('/:id/entries', (req, res) => {
  try{
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  }
  catch(e){
    res.status(400).send(e.message);
  }
});

router.get('/', (_req, res) => { 
    res.send(patientService.getEntries());
});

router.post('/', (req, res) => {
  try{
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  }
  catch(e){
    res.status(400).send(e.message);
  }
});

  export default router;