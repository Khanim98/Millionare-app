import React from "react";

export default function Trivia({
   data,
   setQuestionNumber,
   setStop,
   questionNumber
}) {
    const [question, setQuestion] = React.useState(null)
    const [selectedAnswer, setSelectedAnswer] = React.useState(null)
    const [className, setClassName] = React.useState('answer')

    React.useEffect(() => {
        setQuestion(data[questionNumber - 1])
    },[data, questionNumber])

    const delay = (duration,callback) => {
        setTimeout(() => {
            callback();
        }, duration)
    }
    const handleClick = (answer) => {
        setSelectedAnswer(answer)
        setClassName('answer active')
        delay(3000,setClassName(answer.correct ? 'answer correct' : 'answer wrong'))
        delay(6000, () =>{
            if(answer.correct){
                setQuestionNumber(prev => prev + 1)
                setSelectedAnswer(null)
            }else{
                setStop(true)
            }
        })
    }
    return(
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map(answer => (
                    <div
                        className={selectedAnswer === answer ? className : 'answer '}
                         onClick={() => handleClick(answer)}
                    >
                        {answer.text}
                    </div>
                ))}

            </div>
        </div>
    )
}