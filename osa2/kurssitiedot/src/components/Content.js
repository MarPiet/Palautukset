import React from "react"
import Part from "./Part"
import Total from "./Total"

const Content = ({course}) => {
    return (
      <div>
        {course.parts.map((part) => <Part part={part} key={part.id} />)}
        <Total course={course}/>
      </div>
    )
  }

export default Content