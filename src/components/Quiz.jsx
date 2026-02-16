import { useState, useCallback } from "react"
import QUESTIONS from "../questions";

import quizCompletedImg from "../assets/quiz-complete.png"
import Question from "./Question";

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
        return <div id="summary">
                <img src={quizCompletedImg} alt="quiz completed img"/>
                <h2>Quiz Completed!</h2>
            </div>
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