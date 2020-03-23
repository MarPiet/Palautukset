import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {
    if(props.total > 0)
    return(
        <div>        
            <StatisticsLine text = "good" value={props.good}/>
            <StatisticsLine text = "neutral" value={props.neutral}/>
            <StatisticsLine text = "bad" value={props.bad}/>
            <StatisticsLine text = "all" value={props.total}/>
            <StatisticsLine text = "average" value={(props.good - props.bad) / props.total}/>
            <StatisticsLine text = "positive" value={props.good/props.total * 100}/>
        </div>
    )
    return(
        <p>No feedback given</p>
    )
  }

  const StatisticsLine = (props) =>{
    return(
        <table>
            <tbody>
                <tr>  
                    {(props.text !== "positive") 
                    ?<td>{props.text} {props.value}</td>
                    :<td>{props.text} {props.value} %</td>
                    } 
                </tr>
            </tbody>
        </table>
    )
  }

const Button = (props) => {
    if(props.value === 1)
        return(<button onClick={() => props.click(1)}>good</button>)
    if(props.value === 0)
        return(<button onClick={() => props.click(0)}>neural</button>)
    if(props.value === -1)
        return(<button onClick={() => props.click(-1)}>bad</button>)
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

    const handleClick = (value) =>{
        if(value === 1){
            setGood(good + 1)
        }
        if(value === 0){
            setNeutral(neutral + 1)
        }
        if(value === -1){
            setBad(bad + 1)
        }

        setTotal(total + 1)
    }

  return (
    <div>
        <h1>give feedback</h1>
        <Button value={1}  click={handleClick.bind(this)}/>
        <Button value={0}  click={handleClick.bind(this)}/>
        <Button value={-1} click={handleClick.bind(this)}/>
        <h1>statistics</h1>
        <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)