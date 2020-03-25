import React from "react"

const Total = ({ course }) => {
    const exerciseArr = course.parts.map((part) => part.exercises)
    const sum = exerciseArr.reduce(function(a, b) { return a + b }, 0)
    
    return(
      <p>Total of {sum} exercises</p>
    ) 
  }

export default Total