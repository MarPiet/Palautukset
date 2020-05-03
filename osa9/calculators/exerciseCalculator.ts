
interface RatingValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }

const calculateExercises = (hours: Array<number>): RatingValues => {
    if(hours.length < 2){
        throw new Error('Input should include a target value and atleast one day');
     }
     hours.forEach(hour => {
         if(isNaN(hour))
         throw new Error('Input should only include numbers');
     });

let daysTrained = 0;
let sum = 0;
let succesful = false;
const target = hours[0];
let ratingDescription = '';
hours = hours.slice(1);

hours.forEach(hours => {
    if(hours !== 0){
        daysTrained = daysTrained + 1;
    }
    sum = sum + hours;
});
const avg = sum/hours.length;
const rating = avg + hours.length/15;
if (avg >= target){
    succesful = true;
}

if(rating < 1.0 ){
    ratingDescription = 'Not Great';
}
else if(rating <= 2.0 && rating > 1.0){
    ratingDescription = 'Mediocre';
}
else if(rating > 2.0){
    ratingDescription = 'Nice Job';
}

return{
    periodLength: hours.length,
    trainingDays: daysTrained,
    success: succesful,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: avg
};
};



const hours = process.argv.slice(2);
const intHours = [];
for(let i = 0; i < hours.length; ++i){
    intHours[i] = Number(hours[i]);
}
try{
    console.log(calculateExercises(intHours));
}
catch(e){
console.log('Error:', e.message);
}

export default calculateExercises;