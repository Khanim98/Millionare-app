import React, {useEffect} from "react";
import useSound from 'use-sound';
import play from '../assets/play.wav';
import wrong from '../assets/wrong.wav';
import correct from '../assets/correct.wav';


export default function Trivia({
   data,
   setQuestionNumber,
   setStop,
   questionNumber
}) {
    const [question, setQuestion] = React.useState(null);
    const [selectedAnswer, setSelectedAnswer] = React.useState(null);
    const [className, setClassName] = React.useState('answer');
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    useEffect(() => {
        letsPlay();
    },[letsPlay])

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
        delay(5000, () =>{
            if(answer.correct){
                correctAnswer();
                delay(1000, () => {
                    setQuestionNumber(prev => prev + 1)
                    setSelectedAnswer(null)
                });
            }else{
                wrongAnswer();
                delay(1000, () => {
                    setStop(true)
                })
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