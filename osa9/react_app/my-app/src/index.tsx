import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header'
import Total from './components/Total'

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface DescriptionPart extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartBase, DescriptionPart {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase, DescriptionPart {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase, DescriptionPart {
  name: "React"
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour


const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<CoursePart> = (props) => {
  switch(props.name){
    case "Fundamentals":
      return(<p>{props.name} {props.exerciseCount} {props.description}</p>);
    case "Using props to pass data":
      return(<p>{props.name} {props.exerciseCount} {props.groupProjectCount}</p>);
    case "Deeper type usage":
      return(<p>{props.name} {props.exerciseCount} {props.description} {props.exerciseSubmissionLink}</p>);
    case "React":
      return(<p>{props.name} {props.exerciseCount} {props.description}</p>);
    default:
      return assertNever(props)
  }
}

const Content = (props: any) => {
  return (
      <div>
        <Part {...props.courseParts[0]}></Part>
        <Part {...props.courseParts[1]}></Part>
        <Part {...props.courseParts[2]}></Part>
        <Part {...props.courseParts[3]}></Part>
      </div>
)
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "React",
      exerciseCount: 14,
      description: "Confusing description",
    }
  ];
  
  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total courseParts={courseParts}></Total>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));