import { useState, useCallback } from "react"
import QUESTIONS from "../questions";

import quizCompletedImg from "../assets/quiz-complete.png"
import Question from "./Question";

export default function Quiz() {
    const [answerState, setAnswerState] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
                

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length -1;
    
    const isQuizCompleted = activeQuestionIndex === QUESTIONS.length;
    
    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered');

        setUserAnswers((prevAnswers) => {
            return [...prevAnswers, selectedAnswer]
        });

        setTimeout(() => {
            selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0] ? setAnswerState('correct') : setAnswerState('wrong');
            
            setTimeout(() => {
                setAnswerState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex])

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
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSkipAnswer={handleSkipAnswer}
                onSelectAnswer={handleSelectAnswer}
                />
        </div>
    );
}