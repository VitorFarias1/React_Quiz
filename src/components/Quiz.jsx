import { useState, useCallback } from "react"
import QUESTIONS from "../questions";

import quizCompletedImg from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer";

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

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);
    

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer 
                key={activeQuestionIndex}
                timeout={10000} 
                onTimeout={handleSkipAnswer}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">{shuffledAnswers.map((answer) => {
                    const isSelected =  userAnswers[userAnswers.length - 1] === answer
                    let cssClass = '';

                    if (answerState === 'answered' && isSelected) {
                        cssClass = 'selected';
                    }

                    if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                        cssClass = answerState
                    }

                    return <li key={answer} className="answer">
                        <button onClick={() => handleSelectAnswer(answer)} className={cssClass}>{answer}</button>
                    </li>
                } 
                )}
                </ul>
            </div>
            
        </div>
    );
}