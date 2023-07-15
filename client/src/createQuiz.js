import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import Navbar from "./navbar";
import { Link, useNavigate } from "react-router-dom";

const Createquiz = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [ quizName, setquizName]=useState('')
    const[quizDesc, setquizDesc]=useState('')
    const [questions, setQuestions] = useState([{ question: "", options: ["", "", "",""], correctOption: "" }]);
   
    const handleQuiznameChange = (event)=> {
        setquizName(event.target.value);
    };
    const handleQuizDesc=(event)=>{
        setquizDesc(event.target.value)
    }
    const handleQuestionChange = (index, event) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = event.target.value;
        setQuestions(updatedQuestions);
    };
    const handleOptionChange = (questionIndex, optionIndex, event) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
        setQuestions(updatedQuestions);
    };
    const handleCorrectOptionChange = (questionIndex, event) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctOption = event.target.value;
        setQuestions(updatedQuestions);
    };
    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", options: ["", "", "",""], correctOption: "" }]);
    };

    const handleSubmit = (event) => {
        const quizinfo = []
        quizinfo.push(quizName)
        quizinfo.push(quizDesc)
        quizinfo.push(id)
        quizinfo.push(questions)
        event.preventDefault();
        axios.post('http://localhost:5000/createQuiz',{ quizinfo },{withCredentials:true}).then((res)=>navigate('/profile')).catch((err)=>console.log(err))
        navigate('/')
    };

    return ( 
        <div>
            <Navbar/>
            <div className="container-fluid createquiz">
            <h1>Create Quiz </h1>
            <form onSubmit={handleSubmit}>
                <div className="quizheader">
                    <label > Quiz Name</label>
                    <input type="text" required value={quizName} onChange={(event)=>handleQuiznameChange(event)} />
                    <label> Quiz Description </label>
                    <input type="text" required onChange={(event)=>handleQuizDesc(event)} />
                </div>
                {questions.map((question, questionIndex) => (
                    <div className="singlequestion" key={questionIndex}>
                        <label>Question {questionIndex + 1}:</label>
                        <input
                            type="text"
                            value={question.question}
                            required
                            onChange={(event) => handleQuestionChange(questionIndex, event)}
                        />
                        {question.options.map((option, optionIndex) => (
                            <div className="optionConatiner" key={optionIndex}>
                                <label>Option {optionIndex + 1}:</label>
                                <input
                                    type="text"
                                    value={option}
                                    required
                                    onChange={(event) => handleOptionChange(questionIndex, optionIndex, event)}
                                />
                            </div>
                        ))}
                        <label>Correct Option:</label>
                        <input
                            type="text"
                            required
                            value={question.correctOption}
                            onChange={(event) => handleCorrectOptionChange(questionIndex, event)}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddQuestion}>
                    Add Question
                </button>
                <button type="submit">Submit Quiz</button>
            </form> 
            </div>
        </div>
     );
}
 
export default Createquiz;