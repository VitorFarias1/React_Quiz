import quizHeaderImg from '../assets/quiz-logo.png'

export default function Header() {
    return <header>
        <img src={quizHeaderImg} alt="Quiz Image" />
        <h1>React Quiz</h1>
    </header>
} 