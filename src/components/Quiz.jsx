import { useState } from "react"

export default function Quiz() {
    
    const [userAnswer, setUserAnswer] = useState([]);

    const activeQuestionIndex = userAnswer.length;

    return <p>Some Question here!</p>
}