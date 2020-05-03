import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if(!req.query.height || !req.query.weight || isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))){
    res.status(400).send({error: 'parameters missing'});
  }

  const response = {weight: Number(req.query.weight), height: Number(req.query.height), bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))};
  res.send(response);
});

app.post('/exercises', (req, res) => {
  if(!req.body.daily_exercises || !req.body.target){
    res.status(400).send({error: 'parameters missing'});
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req.body.daily_exercises.forEach((hours: any) => {
    if(isNaN(Number(hours))){
      res.status(400).send({error: 'malformatted parameters'});
    }
  });
  if(isNaN(Number(req.body.target))){
    res.status(400).send({error: 'malformatted parameters'});
  }

  const target = [];
  target[0] = req.body.target;
  const combined = target.concat(req.body.daily_exercises);
  console.log(calculateExercises(combined));
  res.json(req.body);
});



const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});