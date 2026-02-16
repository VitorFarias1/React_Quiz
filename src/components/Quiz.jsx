import { useState, useCallback } from "react"
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
        
    const activeQuestionIndex = userAnswers.length;
    const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {

        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer]
        });
    }, [])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (isQuizCompleted) {
        return <Summary userAnswers={userAnswers}/>
    }    

    return (
        <div id="quiz">
            <Question 
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSkipAnswer={handleSkipAnswer}
                onSelectAnswer={handleSelectAnswer}
                />
        </div>
    );
}