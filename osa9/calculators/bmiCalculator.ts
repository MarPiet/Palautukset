
const calculateBmi = (cm: number, kg: number): string => {
if(cm === 0){
    return "Length cannot be 0";
}
const bmi = kg/((cm/100)*(cm/100));

if(bmi <= 15)
    return("Very severely underweight");
else if(bmi > 15 && bmi <= 16 )
    return("Severely underweight");
else if(bmi > 16 && bmi <= 18.5 )
    return("Underweight");
else if(bmi > 18.5 && bmi <= 25 )
    return("Normal (healthy weight)");
else if(bmi > 25 && bmi <= 30 )
    return("Overweight");
else if(bmi > 30 && bmi <= 35 )
    return("Obese Class I (Moderately obese)");
else if(bmi > 35 && bmi <= 40 )
    return("Obese Class II (Severely obese)");
else if(bmi > 40)
    return("Obese Class III (Very severely obese)");

return('error');
};

console.log(calculateBmi(Number(process.argv[2]),Number(process.argv[3])));

export default calculateBmi;